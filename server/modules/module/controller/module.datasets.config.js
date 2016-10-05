'use strict';

exports.allFeatureFields = [
	'ldcId',

	'title',
	'description',

	'background_for_students',
	'extension',

	'curriculum.course_name',
	'curriculum.lower_grade',
	'curriculum.upper_grade',
	'curriculum.discipline.name',

	'teaching_task.substitutions', // `substitutions` is an array of strings
	'teaching_task.template.phase_name',
	'teaching_task.template.writing_type.name',
	'teaching_task.template.writing_sub_type.name',
	'teaching_task.demands.count', // `demands` is an array
	'teaching_task.demands.template.prompt',

	'skills_and_minitasks.count', // `skills_and_minitasks` is an array
	'skills_and_minitasks.name',
	'skills_and_minitasks.skills.count', // `skills` is an array
	'skills_and_minitasks.skills.name',
	'skills_and_minitasks.skills.definition',

	'texts.count', // `texts` is an array
	'texts.class_name',
	'texts.name',
	'texts.description',

	'instructional_resources.count', // `instructional_resources` is an array
	'instructional_resources.name', 

	'education_standards.count', // `education_standards` is an array
	'education_standards.education_standard.description',
	'education_standards.education_standard.standards_group',
	'education_standards.education_standard.alt_standards_group',
	'education_standards.education_standard.education_standards_document_title',
	'education_standards.education_standard.lower_grade',
	'education_standards.education_standard.upper_grade',
	'education_standards.education_standard.subjects.label', // `subjects` is an array
	'education_standards.education_standard.standards_path.description', // `standards_path` is an array

	'teacher_reflection',
	'student_work_samples.count', // `student_work_samples` is an array
	'student_work_samples.attachment_point_option_code',

	'minitasks.count', // `minitasks` is an array
	'minitasks.product_name',
	'minitasks.prompt',
	'minitasks.scoring_guide',
	'minitasks.instructional_strategies',
	'minitasks.pacing'
];

exports.indicatorCategories = [
	{
		name: 'Task Clarity & Coherence',
		filename: 'task-clarity-and-coherence',
		featureFields: [
			'ldcId',
			
			'title',
			'description',

			'background_for_students',
			'extension',

			'teaching_task.substitutions',
			'teaching_task.template.phase_name',
			'teaching_task.template.writing_type.name',
			'teaching_task.template.writing_sub_type.name',
			'teaching_task.demands.count',
			'teaching_task.demands.template.prompt',

			'texts.count',
			'texts.class_name',
			'texts.name',
			'texts.description'
		],
		indicatorPrefix: 'td1'
	},
	{
		name: 'Content',
		filename: 'content',
		featureFields: [
			'ldcId',
			
			'title',
			'description',

			'curriculum.course_name',
			'curriculum.lower_grade',
			'curriculum.upper_grade',
			'curriculum.discipline.name',

			'teaching_task.substitutions',
			'teaching_task.template.phase_name',
			'teaching_task.template.writing_type.name',
			'teaching_task.template.writing_sub_type.name',
			'teaching_task.demands.count',
			'teaching_task.demands.template.prompt',

			'education_standards.count',
			'education_standards.education_standard.description',
			'education_standards.education_standard.standards_group',
			'education_standards.education_standard.alt_standards_group',
			'education_standards.education_standard.education_standards_document_title',
			'education_standards.education_standard.lower_grade',
			'education_standards.education_standard.upper_grade',
			'education_standards.education_standard.subjects.label',
			'education_standards.education_standard.standards_path.description'
		],
		indicatorPrefix: 'td2'
	},
	{
		name: 'Text',
		filename: 'text',
		featureFields: [
			'ldcId',
			
			'title',
			'description',

			'background_for_students',
			'extension',

			'curriculum.course_name',
			'curriculum.lower_grade',
			'curriculum.upper_grade',
			'curriculum.discipline.name',

			'texts.count',
			'texts.class_name',
			'texts.name',
			'texts.description'
		],
		indicatorPrefix: 'td3'
	},
	{
		name: 'Writing Product',
		filename: 'writing-product',
		featureFields: [
			'ldcId',
			
			'title',
			'description',

			'curriculum.course_name',
			'curriculum.lower_grade',
			'curriculum.upper_grade',
			'curriculum.discipline.name',

			'teaching_task.substitutions',
			'teaching_task.template.phase_name',
			'teaching_task.template.writing_type.name',
			'teaching_task.template.writing_sub_type.name',
			'teaching_task.demands.count',
			'teaching_task.demands.template.prompt'
		],
		indicatorPrefix: 'td4'
	},
	{
		name: 'Skills',
		filename: 'skills',
		featureFields: [
			'ldcId',
			
			'title',
			'description',

			'curriculum.course_name',
			'curriculum.lower_grade',
			'curriculum.upper_grade',
			'curriculum.discipline.name',

			'skills_and_minitasks.count',
			'skills_and_minitasks.name',
			'skills_and_minitasks.skills.count',
			'skills_and_minitasks.skills.name',
			'skills_and_minitasks.skills.definition'
		],
		indicatorPrefix: 'ld1'
	},
	{
		name: 'Instruction',
		filename: 'instruction',
		featureFields: [
			'ldcId',
			
			'title',
			'description',

			'curriculum.course_name',
			'curriculum.lower_grade',
			'curriculum.upper_grade',
			'curriculum.discipline.name',

			'teaching_task.substitutions',
			'teaching_task.template.phase_name',
			'teaching_task.template.writing_type.name',
			'teaching_task.template.writing_sub_type.name',
			'teaching_task.demands.count',
			'teaching_task.demands.template.prompt',

			'instructional_resources.count',
			'instructional_resources.name',

			'minitasks.count',
			'minitasks.product_name',
			'minitasks.prompt',
			'minitasks.scoring_guide',
			'minitasks.instructional_strategies',
			'minitasks.pacing'
		],
		indicatorPrefix: 'ld2'
	},
	{
		name: 'Results',
		filename: 'results',
		featureFields: [
			'ldcId',
			
			'teacher_reflection',
			'student_Work_samples.count',
			'student_work_samples.attachment_point_option_code'
		],
		indicatorPrefix: 'ld3'
	}
];