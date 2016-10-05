'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var fs = require('fs'),
	fse = require('fs-extra'),
	_ = require('lodash'),
	archiver = require('archiver');

//----------------------------------------------------------------------------------------------------------------------
// Models

var mongoose = require('mongoose'),
	Module = mongoose.model('Module');

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var error = require('../../error'),
	logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Methods

function csvEscape(str) {
	return '"' + String(str || '').replace(/\"/g, '""') + '"';
}

function stripHtml(str) {
 	str = str.replace(/<[^>]*>/g, ' ');
	str = str.replace(/&#xA0;/g, ' ');
	str = str.replace(/[\s]{2,10}/g, ' ');
	return str;
}

function extractCsvHeaders(fields, maximums) {
	if (!fields || !fields.length || !maximums) {
		return '';
	}

	var csvHeaders = [],
		i, x, j, y, headerArray;

	fields.forEach(function(field) {
		i = null;
		x = null;
		j = null;
		y = null;
		headerArray = null;

		switch(field) {

			// teaching task
			case 'teaching_task.demands.template.prompt':
				if (maximums.teachingTaskDemands && maximums.teachingTaskDemands > 1) {
					for(i=0, x=maximums.teachingTaskDemands; i<x; i++) {
						headerArray = field.split('.');
						headerArray.splice(2, 0, i);
						csvHeaders.push(headerArray.join('.'));
					}
				} else {
					csvHeaders.push(field);
				}
				break;

			// skills and minitasks
			case 'skills_and_minitasks.name':
				if (maximums.skillsAndMinitasks && maximums.skillsAndMinitasks > 1) {
					for(i=0, x=maximums.skillsAndMinitasks; i<x; i++) {
						headerArray = field.split('.');
						headerArray.splice(1, 0, i);
						csvHeaders.push(headerArray.join('.'));
					}
				} else {
					csvHeaders.push(field);
				}
				break;
			case 'skills_and_minitasks.skills.name':
			case 'skills_and_minitasks.skills.definition':
				if (maximums.skillsAndMinitasks && maximums.skillsAndMinitasks > 1) {
					for(i=0, x=maximums.skillsAndMinitasks; i<x; i++) {
						if (maximums.skillsAndMinitasksSkills && maximums.skillsAndMinitasksSkills > 1) {
							for(j=0, y=maximums.skillsAndMinitasksSkills; j<y; j++) {
								headerArray = field.split('.');
								headerArray.splice(2, 0, j);
								headerArray.splice(1, 0, i);
								csvHeaders.push(headerArray.join('.'));
							}
						} else {
							headerArray = field.split('.');
							headerArray.splice(1, 0, i);
							csvHeaders.push(headerArray.join('.'));
						}
					}
				} else {
					csvHeaders.push(field);
				}
				break;

			// texts
			case 'texts.class_name':
			case 'texts.name':
			case 'texts.description':
				if(maximums.texts && maximums.texts > 1) {
					for(i=0, x=maximums.texts; i<x; i++) {
						headerArray = field.split('.');
						headerArray.splice(1, 0, i);
						csvHeaders.push(headerArray.join('.'));
					}
				} else {
					csvHeaders.push(field);
				}
				break;

			// instructional resources
			case 'instructional_resources.name':
				if(maximums.instructionalResources && maximums.instructionalResources > 1) {
					for(i=0, x=maximums.instructionalResources; i<x; i++) {
						headerArray = field.split('.');
						headerArray.splice(1, 0, i);
						csvHeaders.push(headerArray.join('.'));
					}
				} else {
					csvHeaders.push(field);
				}
				break;

			// education standards
			case 'education_standards.education_standard.description':
			case 'education_standards.education_standard.standards_group':
			case 'education_standards.education_standard.alt_standards_group':
			case 'education_standards.education_standard.education_standards_document_title':
			case 'education_standards.education_standard.lower_grade':
			case 'education_standards.education_standard.upper_grade':
				if(maximums.educationStandards && maximums.educationStandards > 1) {
					for(i=0, x=maximums.educationStandards; i<x; i++) {
						headerArray = field.split('.');
						headerArray.splice(1, 0, i);
						csvHeaders.push(headerArray.join('.'));
					}
				} else {
					csvHeaders.push(field);
				}
				break;
			case 'education_standards.education_standard.subjects.label':
				if (maximums.educationStandards && maximums.educationStandards > 1) {
					for(i=0, x=maximums.educationStandards; i<x; i++) {
						if (maximums.educationStandardsSubjects && maximums.educationStandardsSubjects > 1) {
							for(j=0, y=maximums.educationStandardsSubjects; j<y; j++) {
								headerArray = field.split('.');
								headerArray.splice(3, 0, j);
								headerArray.splice(1, 0, i);
								csvHeaders.push(headerArray.join('.'));
							}
						} else {
							headerArray = field.split('.');
							headerArray.splice(1, 0, i);
							csvHeaders.push(headerArray.join('.'));
						}
					}
				} else {
					csvHeaders.push(field);
				}
				break;
			case 'education_standards.education_standard.standards_path.description':
				if (maximums.educationStandards && maximums.educationStandards > 1) {
					for(i=0, x=maximums.educationStandards; i<x; i++) {
						if (maximums.educationStandardsPath && maximums.educationStandardsPath > 1) {
							for(j=0, y=maximums.educationStandardsPath; j<y; j++) {
								headerArray = field.split('.');
								headerArray.splice(3, 0, j);
								headerArray.splice(1, 0, i);
								csvHeaders.push(headerArray.join('.'));
							}
						} else {
							headerArray = field.split('.');
							headerArray.splice(1, 0, i);
							csvHeaders.push(headerArray.join('.'));
						}
					}
				} else {
					csvHeaders.push(field);
				}
				break;

			// student work samples
			case 'student_work_samples.attachment_point_option_code':
				if(maximums.studentWorkSamples && maximums.studentWorkSamples > 1) {
					for(i=0, x=maximums.studentWorkSamples; i<x; i++) {
						headerArray = field.split('.');
						headerArray.splice(1, 0, i);
						csvHeaders.push(headerArray.join('.'));
					}
				} else {
					csvHeaders.push(field);
				}
				break;

			// minitasks
			case 'minitasks.product_name':
			case 'minitasks.prompt':
			case 'minitasks.scoring_guide':
			case 'minitasks.instructional_strategies':
			case 'minitasks.pacing':
				if(maximums.minitasks && maximums.minitasks > 1) {
					for(i=0, x=maximums.minitasks; i<x; i++) {
						headerArray = field.split('.');
						headerArray.splice(1, 0, i);
						csvHeaders.push(headerArray.join('.'));
					}
				} else {
					csvHeaders.push(field);
				}
				break;

			// default
			default:
				csvHeaders.push(field);
		}
	});

	// add indicator & score
	csvHeaders = csvHeaders.concat(['indicator', 'score']);

	// done
	return csvHeaders.map(csvEscape).join(',')+'\n';
}

function extractCsvData(prefix, fields, maximums, module) {
	if (!prefix || !fields || !fields.length || !maximums || !module || !module.ldcDbData || !module.manualScores) {
		return '';
	}

	var csvData = [],
		csvString = '',
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
		manualScores = module.manualScores,
		i, x, j, y, fieldName;

	// grab data for each field
	fields.forEach(function(field) {
		switch(field) {

			// ldcId
			case 'ldcId':
				csvData.push(module.ldcId);
				break;

			// title/description
			case 'title':
				csvData.push(modBody.title);
				break;
			case 'description':
				csvData.push(stripHtml(modBody.description));
				break;

			// background/extension
			case 'background_for_students':
				csvData.push(stripHtml(modBody.background_for_students));
				break;
			case 'extension':
				csvData.push(stripHtml(modBody.extension));
				break;

			// curriculum
			case 'curriculum.course_name':
				csvData.push(curriculum.course_name);
				break;
			case 'curriculum.lower_grade':
				csvData.push(curriculum.lower_grade);
				break;
			case 'curriculum.upper_grade':
				csvData.push(curriculum.upper_grade);
				break;
			case 'curriculum.discipline.name':
				csvData.push(curriculumDiscipline.name);
				break;

			// teaching task
			case 'teaching_task.substitutions':
				csvData.push(teachingTaskSubstitutions.join(' '));
				break;
			case 'teaching_task.template.lower_grade':
				csvData.push(teachingTaskTemplate.lower_grade);
				break;
			case 'teaching_task.template.upper_grade':
				csvData.push(teachingTaskTemplate.upper_grade);
				break;
			case 'teaching_task.template.phase_name':
				csvData.push(teachingTaskTemplate.phase_name);
				break;
			case 'teaching_task.template.writing_type.name':
				var writingType = teachingTaskTemplate.writing_type || {};
				csvData.push(writingType.name);
				break;
			case 'teaching_task.template.writing_sub_type.name':
				var writingSubType = teachingTaskTemplate.writing_sub_type || {};
				csvData.push(writingSubType.name);
				break;
			case 'teaching_task.demands.count':
				csvData.push(teachingTaskDemands.length);
				break;
			case 'teaching_task.demands.template.prompt':
				if(maximums.teachingTaskDemands && maximums.teachingTaskDemands > 1) {
					for(i=0, x=maximums.teachingTaskDemands; i<x; i++) {
						if (teachingTaskDemands[i] && teachingTaskDemands[i].template) {
							csvData.push(teachingTaskDemands[i].template.prompt);
						} else {
							csvData.push('');
						}
					}
				} else {
					csvData.push('');
				}
				break;

			// skills and minitasks
			case 'skills_and_minitasks.count':
				csvData.push(skillsAndMinitasks.length);
				break;
			case 'skills_and_minitasks.name':
				if(maximums.skillsAndMinitasks && maximums.skillsAndMinitasks > 1) {
					for(i=0, x=maximums.skillsAndMinitasks; i<x; i++) {
						if (skillsAndMinitasks[i]) {
							csvData.push(skillsAndMinitasks[i].name);
						} else {
							csvData.push('');
						}
					}
				} else {
					csvData.push('');
				}
				break;
			case 'skills_and_minitasks.skills.count':
				var skillsCount = 0;
				skillsAndMinitasks.forEach(function(skillAndMinitask) {
					if (skillAndMinitask.skills && skillAndMinitask.skills.length) {
						skillsCount += skillAndMinitask.skills.length;
					}
				});
				csvData.push(skillsCount);
				break;
			case 'skills_and_minitasks.skills.name':
			case 'skills_and_minitasks.skills.definition':
				if(maximums.skillsAndMinitasks && maximums.skillsAndMinitasks > 1) {
					fieldName = field.slice(field.lastIndexOf('.')+1, field.length);
					for(i=0, x=maximums.skillsAndMinitasks; i<x; i++) {
						if (maximums.skillsAndMinitasksSkills && maximums.skillsAndMinitasksSkills > 1) {
							var skills = skillsAndMinitasks[i] ? skillsAndMinitasks[i].skills : [];
							for(j=0, y=maximums.skillsAndMinitasksSkills; j<y; j++) {
								if (skillsAndMinitasks[i] && skills[j]) {
									csvData.push(skillsAndMinitasks[i].skills[j][fieldName]);
								} else {
									csvData.push('');
								}
							}
						} else {
							csvData.push('');
						}
					}
				} else {
					csvData.push('');
				}
				break;

			// texts
			case 'texts.count':
				csvData.push(texts.length);
				break;
			case 'texts.class_name':
			case 'texts.name':
			case 'texts.description':
				if(maximums.texts && maximums.texts > 1) {
					fieldName = field.slice(field.indexOf('.')+1, field.length);
					for(i=0, x=maximums.texts; i<x; i++) {
						if (texts[i]) {
							csvData.push(texts[i][fieldName]);
						} else {
							csvData.push('');
						}
					}
				} else {
					csvData.push('');
				}
				break;

			// instructional resources
			case 'instructional_resources.count':
				csvData.push(instructionalResources.length);
				break;
			case 'instructional_resources.name':
				if(maximums.instructionalResources && maximums.instructionalResources > 1) {
					for(i=0, x=maximums.instructionalResources; i<x; i++) {
						if (instructionalResources[i]) {
							csvData.push(instructionalResources[i].name);
						} else {
							csvData.push('');
						}
					}
				} else {
					csvData.push('');
				}
				break;

			// education standards
			case 'education_standards.count':
				csvData.push(educationStandards.length);
				break;
			case 'education_standards.education_standard.description':
			case 'education_standards.education_standard.standards_group':
			case 'education_standards.education_standard.alt_standards_group':
			case 'education_standards.education_standard.education_standards_document_title':
			case 'education_standards.education_standard.lower_grade':
			case 'education_standards.education_standard.upper_grade':
				if(maximums.educationStandards && maximums.educationStandards > 1) {
					fieldName = field.slice(field.lastIndexOf('.')+1, field.length);
					for(i=0, x=maximums.educationStandards; i<x; i++) {
						if (educationStandards[i] && educationStandards[i].education_standard) {
							csvData.push(educationStandards[i].education_standard[fieldName]);
						} else {
							csvData.push('');
						}
					}
				} else {
					csvData.push('');
				}
				break;
			case 'education_standards.education_standard.subjects.label':
				if(maximums.educationStandards && maximums.educationStandards > 1) {
					for(i=0, x=maximums.educationStandards; i<x; i++) {
						if (maximums.educationStandardsSubjects && maximums.educationStandardsSubjects > 1) {
							var subjects = (educationStandards[i] && educationStandards[i].education_standard && educationStandards[i].education_standard.subjects) ?
								educationStandards[i].education_standard.subjects : [];
							for(j=0, y=maximums.educationStandardsSubjects; j<y; j++) {
								if (subjects[j]) {
									csvData.push(subjects[j].label);
								} else {
									csvData.push('');
								}
							}
						} else {
							csvData.push('');
						}
					}
				} else {
					csvData.push('');
				}
				break;
			case 'education_standards.education_standard.standards_path.description':
				if(maximums.educationStandards && maximums.educationStandards > 1) {
					for(i=0, x=maximums.educationStandards; i<x; i++) {
						if (maximums.educationStandardsPath && maximums.educationStandardsPath > 1) {
							var path = (educationStandards[i] && educationStandards[i].education_standard && educationStandards[i].education_standard.standards_path) ?
								educationStandards[i].education_standard.standards_path : [];
							for(j=0, y=maximums.educationStandardsPath; j<y; j++) {
								if (path[j]) {
									csvData.push(path[j].description);
								} else {
									csvData.push('');
								}
							}
						} else {
							csvData.push('');
						}
					}
				} else {
					csvData.push('');
				}
				break;

			// teacher reflection
			case 'teacher_reflection':
				csvData.push(stripHtml(modBody.teacher_reflection));
				break;

			// student work samples
			case 'student_work_samples.count':
				csvData.push(studentWorkSamples.length);
				break;
			case 'student_work_samples.attachment_point_option_code':
				if(maximums.studentWorkSamples && maximums.studentWorkSamples > 1) {
					for(i=0, x=maximums.studentWorkSamples; i<x; i++) {
						if (studentWorkSamples[i]) {
							csvData.push(studentWorkSamples[i].attachment_point_option_code);
						} else {
							csvData.push('');
						}
					}
				} else {
					csvData.push('');
				}
				break;

			// minitasks
			case 'minitasks.count':
				csvData.push(minitasks.length);
				break;
			case 'minitasks.product_name':
			case 'minitasks.prompt':
			case 'minitasks.scoring_guide':
			case 'minitasks.instructional_strategies':
			case 'minitasks.pacing':
				if(maximums.minitasks && maximums.minitasks > 1) {
					fieldName = field.slice(field.lastIndexOf('.')+1, field.length);
					for(i=0, x=maximums.minitasks; i<x; i++) {
						if (minitasks[i]) {
							csvData.push(stripHtml(minitasks[i][fieldName]));
						} else {
							csvData.push('');
						}
					}
				} else {
					csvData.push('');
				}
				break;
			
			// default
			default:
				csvData.push('');
		}
	});

	// add indicators & scores
	for(var key in manualScores) {
		if (manualScores.hasOwnProperty(key)) {
			if (key.indexOf(prefix) === 0) {
				var indicator = key.slice(0, 4),
					csvDataWithScore = csvData.concat([indicator, manualScores[key]]);
				csvString += csvDataWithScore.map(csvEscape).join(',')+'\n';
			}
		}
	}

	// done
	return csvString;
}

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * MODULE.DATASETS.DOWNLOAD
 * - Export modules as csv for Azure Studio dataset upload.
 * - Separate csv file for each indicator category. (different datasets)
 */
exports.downloadDatasets = function(req, res) {
	logger.filename(__filename);

	// variables
	var indicatorCategories = require('./module.datasets.config.js').indicatorCategories,
		fieldMaximums = {},
		writeStreams = [],
		filenames = [];

	// zip files and return
	function zipAndReturn() {
		logger.dash('zip and return');

		res.setHeader('Content-disposition', 'attachment; filename=\"alignment-datasets.zip\"');
		res.contentType('application/zip');

		var zip = archiver('zip');

		zip.pipe(res);

		filenames.forEach(function(fname) {
			zip.file('./temp/alignment-datasets/'+fname, {name: fname});
		});

		zip.finalize();
	}
	
	// stream modules
	function streamModules() {
		logger.dash('streaming modules');
		var moduleCounter = 0;
		Module.find({manualScores: {$exists: true}, ldcDbData: {$exists: true}})
			//.limit(10) // temp limit for testing
			.stream()
			.on('data', function(moduleDoc) {
				moduleCounter++;
				if (moduleCounter%100 === 0) {
					logger.arrow('module '+moduleCounter);
				}
				writeStreams.forEach(function(wStream) {
					var prefix = wStream.indicatorCategory.indicatorPrefix,
						fields = wStream.indicatorCategory.featureFields,
						moduleCsvData = extractCsvData(prefix, fields, fieldMaximums, moduleDoc);
					wStream.stream.write(moduleCsvData);
				});
			})
			.on('close', function() {
				writeStreams.forEach(function(wStream) {
					wStream.stream.end();
				});
				zipAndReturn();
			})
			.on('error', function(err) {
				error.log(new Error(err));
			});
	}

	// start write streams (for each indicator category dataset)
	function startWriteStreams() {
		logger.dash('starting write streams');
		indicatorCategories.forEach(function(indicatorCategory) {
			var filename = 'alignment-dataset_'+indicatorCategory.filename+'.csv',
				writeStream = fs.createWriteStream('temp/alignment-datasets/'+filename);
			var moduleCsvHeaders = extractCsvHeaders(indicatorCategory.featureFields, fieldMaximums);
			writeStream.write(moduleCsvHeaders);
			filenames.push(filename);
			writeStreams.push({indicatorCategory: indicatorCategory, stream: writeStream});
		});
		streamModules();
	}

	// get maximum length for array fields
	/* - need maximums for:
			teachingTaskDemands
	 		skillsAndMinitasks
	 		skillsAndMinitasksSkills
	 		texts
	 		instructionalResources
	 		educationStandards
	 		educationStandardsSubjects
	 		educationStandardsPath
	 		studentWorkSamples
	 		minitasks
	*/
	function getMaxFieldLengths() {
		logger.dash('getting field maximums');

		var queries = [
			[
				{$match: {spreadsheetData: {$exists: true}, ldcDbData: {$exists: true}}},
				{$group: {
					_id: null,
					teachingTaskDemands: {$max: {$size: '$ldcDbData.body.teaching_task.demands'}},
					skillsAndMinitasks: {$max: {$size: '$ldcDbData.body.skills_and_minitasks'}},
					texts: {$max: {$size: '$ldcDbData.body.texts'}},
					instructionalResources: {$max: {$size: '$ldcDbData.body.instructional_resources'}},
					educationStandards: {$max: {$size: '$ldcDbData.body.education_standards'}},
					studentWorkSamples: {$max: {$size: '$ldcDbData.body.student_work_samples'}},
					minitasks: {$max: {$size: '$ldcDbData.minitasks'}}
				}}
			],
			[
				{$match: {spreadsheetData: {$exists: true}, ldcDbData: {$exists: true}}},
				{$project: {skillsAndMinitasks: '$ldcDbData.body.skills_and_minitasks'}},
				{$unwind: '$skillsAndMinitasks'},
				{$project: {skills: {$ifNull: ['$skillsAndMinitasks.skills', []]}}},
				{$group: {
					_id: null,
					skillsAndMinitasksSkills: {$max: {$size: '$skills'}}
				}}
			],
			[
				{$match: {spreadsheetData: {$exists: true}, ldcDbData: {$exists: true}}},
				{$project: {educationStandards: '$ldcDbData.body.education_standards'}},
				{$unwind: '$educationStandards'},
				{$project: {
					subjects: {$ifNull: ['$educationStandards.education_standard.subjects', []]},
					path: {$ifNull: ['$educationStandards.education_standard.standards_path', []]}
				}},
				{$group: {
					_id: null,
					educationStandardsSubjects: {$max: {$size: '$subjects'}},
					educationStandardsPath: {$max: {$size: '$path'}}
				}}
			]
		];

		// override maximums because some are huge
		function overrideFieldMaximums() {
			fieldMaximums.teachingTaskDemands = Math.min(fieldMaximums.teachingTaskDemands, 5);
			fieldMaximums.skillsAndMinitasks = Math.min(fieldMaximums.skillsAndMinitasks, 6);
			fieldMaximums.skillsAndMinitasksSkills = Math.min(fieldMaximums.skillsAndMinitasksSkills, 10);
			fieldMaximums.texts = Math.min(fieldMaximums.texts, 20);
			fieldMaximums.instructionalResources = Math.min(fieldMaximums.instructionalResources, 20);
			fieldMaximums.educationStandards = Math.min(fieldMaximums.educationStandards, 20);
			fieldMaximums.educationStandardsSubjects = Math.min(fieldMaximums.educationStandardsSubjects, 4);
			fieldMaximums.educationStandardsPath = Math.min(fieldMaximums.educationStandardsPath, 5);
			fieldMaximums.studentWorkSamples = Math.min(fieldMaximums.studentWorkSamples, 20);
			fieldMaximums.minitasks = Math.min(fieldMaximums.minitasks, 25);
		}

		// check done
		var cnt = 0,
			aggregationResults = [];
		function checkDone() {
			cnt -= 1;
			if (cnt <= 0) {
				aggregationResults.forEach(function(aggResult) {
					fieldMaximums = _.extend(fieldMaximums, aggResult);
				});
				overrideFieldMaximums();
				startWriteStreams();
			}
		}

		// get maximums
		function getMaximums(aggregationQuery) {
			Module.aggregate(aggregationQuery)
				.exec(function(err, results) {
					if (err) {
						error.log(new Error(err));
					} else if (!results) {
						error.log(new Error('!results'));
					} else if (results[0]){
						aggregationResults.push(results[0]);
					}
					checkDone();
				});
		}
		
		// start
		cnt = queries.length;
		queries.forEach(function(query) {
			getMaximums(query);
		});
	}
	
	// check directories
	function checkDirectories() {
		logger.dash('checkDirectories');

		function createAlignmentDatasetsDir() {
			fs.mkdir('./temp/alignment-datasets', function(err) {
				if (err) {
					error.log(new Error(err));
					return res.status(500).send({error: err});
				}
				getMaxFieldLengths();
			});
		}

		// check for 'temp' directory
		fs.stat('./temp', function(err, stat) {

			// no 'temp' directory
			if (err === 'ENOENT') {
				fs.mkdir('./temp', function(err) {
					if (err) {
						error.log(new Error(err));
						return res.status(500).send({error: err});
					}
					createAlignmentDatasetsDir();
				});
				return;
			}

			// check for '/temp/alignment-datasets' directory
			fs.stat('./temp/alignment-datasets', function(err, stat) {

				// 'alignment-datasets' directory exists
				if (!err) {
					fse.remove('./temp/alignment-datasets', function(err) {
						if (err) {
							error.log(new Error(err));
							return res.status(500).send({error: err});
						}
						createAlignmentDatasetsDir();
					});
					return;
				}

				// create 'alignment-datasets' directory
				createAlignmentDatasetsDir();
			});
		});
	}

	// start
	checkDirectories();
};