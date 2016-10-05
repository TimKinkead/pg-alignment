'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var request = require('request'),
	url = require('url'),

//----------------------------------------------------------------------------------------------------------------------
// Mongoose Models

	mongoose = require('mongoose'),
	Module = mongoose.model('Module'),

//----------------------------------------------------------------------------------------------------------------------
// Controllers
	
	error = require('../../error'),
	logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Config

var cfg = require('../data/module.prediction.api.config');

//----------------------------------------------------------------------------------------------------------------------
// Methods

function stripHtml(str) {
	str = str.replace(/<[^>]*>/g, ' ');
	str = str.replace(/&#xA0;/g, ' ');
	str = str.replace(/[\s]{2,10}/g, ' ');
	return str;
}

function parseModule(module, columnNames) {
	if (!module.ldcDbData) {return {};}

	var values = [],
		modBody = module.ldcDbData.body || {},
		curriculum = modBody.curriculum || {},
		curriculumDiscipline = curriculum.discipline || {},
		teachingTask = modBody.teaching_task || {},
		teachingTaskSubstitutions = teachingTask.substitutions || [],
		teachingTaskTemplate = teachingTask.template || {},
		teachingTaskDemands = teachingTask.demands || [],
		skillsAndMinitasks = modBody.skills_and_minitasks || [],
		texts = modBody.texts || [],
		instructionalResources = modBody.instructional_resources || [],
		educationStandards = modBody.education_standards || [],
		studentWorkSamples = modBody.student_work_samples || [],
		minitasks = module.ldcDbData.minitasks || [],
		keys, i, j, fieldName;

	columnNames.forEach(function(field) {
		switch (field) {

			// title/description
			case 'title':
				values.push(modBody.title);
				break;
			case 'description':
				values.push(stripHtml(modBody.description));
				break;

			// background/extension
			case 'background_for_students':
				values.push(stripHtml(modBody.background_for_students));
				break;
			case 'extension':
				values.push(stripHtml(modBody.extension));
				break;

			// curriculum
			case 'curriculum.course_name':
				values.push(curriculum.course_name);
				break;
			case 'curriculum.lower_grade':
				values.push(curriculum.lower_grade);
				break;
			case 'curriculum.upper_grade':
				values.push(curriculum.upper_grade);
				break;
			case 'curriculum.discipline.name':
				values.push(curriculumDiscipline.name);
				break;

			// teaching task
			case 'teaching_task.substitutions':
				values.push(teachingTaskSubstitutions.join(' '));
				break;
			case 'teaching_task.template.lower_grade':
				values.push(teachingTaskTemplate.lower_grade);
				break;
			case 'teaching_task.template.upper_grade':
				values.push(teachingTaskTemplate.upper_grade);
				break;
			case 'teaching_task.template.phase_name':
				values.push(teachingTaskTemplate.phase_name);
				break;
			case 'teaching_task.template.writing_type.name':
				var writingType = teachingTaskTemplate.writing_type || {};
				values.push(writingType.name);
				break;
			case 'teaching_task.template.writing_sub_type.name':
				var writingSubType = teachingTaskTemplate.writing_sub_type || {};
				values.push(writingSubType.name);
				break;
			case 'teaching_task.demands.count':
				values.push(teachingTaskDemands.length);
				break;
			case /teaching_task.demands.[0-9]+.template.prompt/.test(field):
				keys = field.split('.');
				i = Number(keys[2]);
				if (teachingTaskDemands[i] && teachingTaskDemands[i].template) {
					values.push(teachingTaskDemands[i].template.prompt);
				} else {
					values.push('');
				}
				break;

			// skills and minitasks
			case 'skills_and_minitasks.count':
				values.push(skillsAndMinitasks.length);
				break;
			case /skills_and_minitasks.[0-9]+.name/.test(field):
				keys = field.split('.');
				i = Number(keys[1]);
				if (skillsAndMinitasks[i]) {
					values.push(skillsAndMinitasks[i].name);
				} else {
					values.push('');
				}
				break;
			case /skills_and_minitasks.[0-9]+.skills.count/.test(field):
				keys = field.split('.');
				i = Number(keys[1]);
				if (skillsAndMinitasks[i] && skillsAndMinitasks[i].skills) {
					values.push(skillsAndMinitasks[i].skills.length);
				} else {
					values.push('');
				}
				break;
			case /skills_and_minitasks.[0-9]+.skills.[0-9]+.name/.test(field):
			case /skills_and_minitasks.[0-9]+.skills.[0-9]+.definition/.test(field):
				keys = field.split('.');
				i = Number(keys[1]);
				j = Number(keys[3]);
				fieldName = keys(4);
				if (skillsAndMinitasks[i] && skillsAndMinitasks[i].skills && skillsAndMinitasks[i].skills[j]) {
					values.push(skillsAndMinitasks[i].skills[j][fieldName]);
				} else {
					values.push('');
				}
				break;

			// texts
			case 'texts.count':
				values.push(texts.length);
				break;
			case /texts.[0-9]+.class_name/.test(field):
			case /texts.[0-9]+.name/.test(field):
			case /texts.[0-9]+.description/.test(field):
				keys = field.split('.');
				i = Number(keys[1]);
				fieldName = keys(2);
				if (texts[i]) {
					values.push(texts[i][fieldName]);
				} else {
					values.push('');
				}
				break;

			// instructional resources
			case 'instructional_resources.count':
				values.push(instructionalResources.length);
				break;
			case /instructional_resources.[0-9]+.name/.test(field):
				keys = field.split('.');
				i = Number(keys[1]);
				if (instructionalResources[i]) {
					values.push(instructionalResources[i].name);
				} else {
					values.push('');
				}
				break;

			// education standards
			case 'education_standards.count':
				values.push(educationStandards.length);
				break;
			case /education_standards.[0-9]+.education_standard.description/.test(field):
			case /education_standards.[0-9]+.education_standard.standards_group/.test(field):
			case /education_standards.[0-9]+.education_standard.alt_standards_group/.test(field):
			case /education_standards.[0-9]+.education_standard.education_standards_document_title/.test(field):
			case /education_standards.[0-9]+.education_standard.lower_grade/.test(field):
			case /education_standards.[0-9]+.education_standard.upper_grade/.test(field):
				keys = field.split('.');
				i = Number(keys[1]);
				fieldName = keys[3];
				if (educationStandards[i] && educationStandards[i].education_standard) {
					values.push(educationStandards[i].education_standard[fieldName]);
				} else {
					values.push('');
				}
				break;
			case /education_standards.[0-9]+.education_standard.subjects.label/.test(field):
				keys = field.split('.');
				i = Number(keys[1]);
				if (educationStandards[i] && educationStandards[i].education_standard && educationStandards[i].education_standard.subjects) {
					values.push(educationStandards[i].education_standard.subjects.label);
				} else {
					values.push('');
				}
				break;
			case /education_standards.[0-9]+.education_standard.standards_path.[0-9]+.description/.test(field):
				keys = field.split('.');
				i = Number(keys[1]);
				j = Number(keys[4]);
				if (educationStandards[i] && educationStandards[i].education_standard &&
					educationStandards[i].education_standard.standards_path && educationStandards[i].education_standard.standards_path[j]) {
					values.push(educationStandards[i].education_standard.standards_path[j].description);
				} else {
					values.push('');
				}
				break;

			// teacher reflection
			case 'teacher_reflection':
				values.push(stripHtml(modBody.teacher_reflection));
				break;

			// student work samples
			case 'student_work_samples.count':
				values.push(studentWorkSamples.length);
				break;
			case /student_work_samples.[0-9]+.attachment_point_option_code/.test(field):
				keys = field.split('.');
				i = Number(keys[1]);
				if (studentWorkSamples[i]) {
					values.push(studentWorkSamples[i].attachment_point_option_code);
				} else {
					values.push('');
				}
				break;

			// minitasks
			case 'minitasks.count':
				values.push(minitasks.length);
				break;
			case /minitasks.[0-9]+.product_name/.test(field):
			case /minitasks.[0-9]+.prompt/.test(field):
			case /minitasks.[0-9]+.scoring_guide/.test(field):
			case /minitasks.[0-9]+.instructional_strategies/.test(field):
			case /minitasks.[0-9]+.pacing/.test(field):
				keys = field.split('.');
				i = Number(keys[1]);
				fieldName = keys(2);
				if (minitasks[i]) {
					values.push(minitasks[i][fieldName]);
				} else {
					values.push('');
				}
				break;

			// default
			default:
				values.push('');
		}
	});

	while (values.indexOf(null) > -1) {
		values[values.indexOf(null)] = '';
	}

	// done
	return {
		Inputs: {
			input: {
				ColumnNames: columnNames,
				Values: [values]
			}
		},
		GlobalParameters: {}
	};
}

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * MODULE.PREDICT
 * - Predict a module's score for a specific indicator.
 */
exports.predict = function(req, res) {
	logger.filename(__filename);

	if (!req.query.id) {
		return res.status(500).send('!req.query.id');
	} else if (!req.query.indicator) {
		return res.status(500).send('!req.query.indicator');
	}

	var indicatorCfg = cfg[req.query.indicator];

	logger.bold(indicatorCfg);

	if (!indicatorCfg || !indicatorCfg.apiKey || !indicatorCfg.apiEndpoint || !indicatorCfg.columnNames) {
		return res.status(500).send('!indicatorConfig');
	}

	// get module
	Module.findById(req.query.id)
		.exec(function(err, moduleDoc) {
			if (err) {
				error.log(new Error(err));
				return res.status(500).send(err);
			} else if (!moduleDoc) {
				error.log(new Error('!moduleDoc'));
				return res.status(500).send('!moduleDoc');
			}

			// ping prediction endpoint
			request(
				{
					method: 'POST',
					url: url.parse(indicatorCfg.apiEndpoint),
					auth: {bearer: indicatorCfg.apiKey},
					json: parseModule(moduleDoc, indicatorCfg.columnNames)
				},
				function(err, response, body) {
					if (err) {
						error.log(new Error(err));
						return res.status(500).send(err);
					} else if (!body) {
						error.log(new Error('!body'));
						return res.status(500).send('!body');
					}

					// parse response body
					/*var bodyData;
					try {
						bodyData = JSON.parse(body);
					} catch(err) {
						error.log(new Error(err));
						return res.status(500).send(err);
					}*/

					// grab score
					var score;
					if (body && body.Results && body.Results.output && body.Results.output.value && body.Results.output.value.Values &&
						body.Results.output.value.Values[0] && body.Results.output.value.Values[0][0]) {
						score = Number(body.Results.output.value.Values[0][0]);
					} else {
						err = new Error('!score');
						try {
							err.body = JSON.parse(body);
						} catch(e) {
							err.body = 'error parsing body';
						}
						error.log(err);
						return res.status(500).send('!score');
					}

					// update module
					var update = {$set: {}};
					update.$set['predictedScores.'+req.query.indicator] = score;
					Module.update(
						{_id: moduleDoc._id},
						update,
						function(err) {
							if (err) {
								error.log(new Error(err));
							}
						}
					);

					// done
					return res.status(200).send(score.toString());
				}
			);
		});
};