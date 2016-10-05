'use strict';

module.exports = (function() {

	var indicators = require('../../indicator/data/indicators.js'),
		config = {};

	indicators.forEach(function(indicator) {
		config[indicator.id] = indicator;
	});

	/*var config = {

		// -- td1 ----------------------------------------------------------------------------------------------------------

		td1a: {
			apiKey: '9WTgtUJrve8VWKiT0qvfYL6VNXn8D3hLMEr15twLVcLQvWIjrwa9jHYSuuJEzOI7Mf8QeM/HfCHJChZ43CLoQQ==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/19674c5fd8b348acac70ba6a6396ebff/endpoints/07bb8d3097744df0b98297e03190754f/score',
			endpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/07bb8d3097744df0b98297e03190754f/execute?api-version=2.0&details=true'
		},
		td1b: {
			apiKey: 'XiOcoOVVQ6le2mL9fE7b1dpuJnPlk8bxiVup9SoFKOB1ojl4WwoCVnsQ1g+8qysGIUDZL/V7NfzyJrjNPHfZfA==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/40ccaa8389314eeea6365db8bfc33011/endpoints/7ce3283a4cb2430bbe014e7f0b31cb64/score',
			endpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/7ce3283a4cb2430bbe014e7f0b31cb64/execute?api-version=2.0&details=true'
		},
		td1c: {
			apiKey: 'BIJzNiwHm7GyZvmiWZlbeKkSHl+P21o2rv2Ov6vHEJA/De+3YpaFUT5oIfbHgQl+qroEGEeS3knV4NfIArZt5w==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/450147bd492a4de6879c296aed21ad2e/endpoints/8c1878fbc01d41b4b300dd7d96f5b663/score',
			endpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/8c1878fbc01d41b4b300dd7d96f5b663/execute?api-version=2.0&details=true'
		},
		td1d: {
			apiKey: '0hgwodjGQ6GFdDs1qEyov9NsqHhuoHCGf35mNSXhJhUKvR35/l5GJsnPZ0/AU10syNFJaFW90kCDBp5vu+r6gA==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/b89fdb7a362e4fac814744c4d6006cfc/endpoints/2cf6fd828bf04d9cb8ec737a385d368f/score',
			endpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/2cf6fd828bf04d9cb8ec737a385d368f/execute?api-version=2.0&details=true'
		},
		td1e: {
			apiKey: 'pmlI5NwKcknWqOjS9JtjzLTJ9ep7cAbh8vDhWTPSm1A0Sd+dHppvg/h57B/tkXVv1rcuwplS2aVvizaPVD6Cxg==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/98625de21fc640b8b0268d83e58f2829/endpoints/597043bfb27c4e66b28768806f287184/score',
			endpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/597043bfb27c4e66b28768806f287184/execute?api-version=2.0&details=true'
		},
		td1f: {
			apiKey: 'jUrg75b7VHs9dxnLWY+otuWdGbGiRg9t+Fs90U6gA/xpGKFCRIt+SCmjtFCekcKfN4a7MNj0Zfkr99GJwf3wDA==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/a094111db7814e1ea8aefd6b51535796/endpoints/25dfaa966b7c45319c08887aa3da8ddc/score',
			endpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/25dfaa966b7c45319c08887aa3da8ddc/execute?api-version=2.0&details=true'
		},
		td1g: {
			apiKey: 'aMCIr1bkUN8hSaD+XLv7LmFVXICIjvU+DcW64KZ5PecwE1UsiilzRDctFQl0CmAjeSDyjDYw5ATpuvZrPL6mtw==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/5b5133ab386a467d9162e19421d1be96/endpoints/5c695ce259a3465da9889fd605c287e8/score',
			endpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/5c695ce259a3465da9889fd605c287e8/execute?api-version=2.0&details=true'
		},

		// -- td2 ----------------------------------------------------------------------------------------------------------

		td2a: {
			apiKey: 'J2ysSj+SkiDOnon6Ojlh27dyZbp4lIszqQ3c9rOl5TrnxwZUEcbgGHoaM22sJlneNAF5QcANd+9nGFmK7jcRiw==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/d74df8afe295406b898bce66d1e74930/endpoints/50f6c5dcc2cb492ca790545ca8a4c380/score',
			endpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/50f6c5dcc2cb492ca790545ca8a4c380/execute?api-version=2.0&details=true'
		},
		td2b: {
			apiKey: 'bCewvY4WRFrE+wBzT4oIPZQn+MvXTXEONbnBIf+rttZ0TEOusZltj5ypnHkzKh1sk8FQQgQZiXTIKt/VGBCsZw==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/04b62716486d460096a3e5086443cee4/endpoints/93dcdae1c09344959fe4eb32a11e29c1/score',
			endpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/93dcdae1c09344959fe4eb32a11e29c1/execute?api-version=2.0&details=true'
		},
		td2c: {
			apiKey: 'qfeRtXwrdBX/TcQIcAd9OgJVg5uiBvw1gnxlKOsG+usM42DHMqTJEFHADk+E55Pihc36/eO+9KlJgeFcCJzVfA==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/ae77a14a0fed436bbb1e4b317b0e3b6e/endpoints/4e280bbdc09f4792a817a280d5e61399/score',
			endpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/4e280bbdc09f4792a817a280d5e61399/execute?api-version=2.0&details=true'
		}
	};*/

	// -----------------------------------------------------------------------------------------------------------------

	var columnNames = {
		td1: [
			'title',
			'description',
			'background_for_students',
			'teaching_task.substitutions',
			'teaching_task.template.writing_type.name',
			'teaching_task.template.writing_sub_type.name',
			'texts.count',
			'texts.0.class_name',
			'texts.1.class_name',
			'texts.2.class_name',
			'texts.3.class_name',
			'texts.0.name',
			'texts.1.name',
			'texts.2.name',
			'texts.3.name'
		],
		td2: [
			'title',
			'description',
			'curriculum.course_name',
			'curriculum.lower_grade',
			'curriculum.upper_grade',
			'curriculum.discipline.name',
			'teaching_task.substitutions',
			'teaching_task.template.writing_type.name',
			'teaching_task.template.writing_sub_type.name',
			'education_standards.count',
			'education_standards.0.education_standard.description',
			'education_standards.1.education_standard.description',
			'education_standards.2.education_standard.description',
			'education_standards.3.education_standard.description',
			'education_standards.4.education_standard.description',
			'education_standards.5.education_standard.description',
			'education_standards.6.education_standard.description',
			'education_standards.7.education_standard.description',
			'education_standards.8.education_standard.description',
			'education_standards.9.education_standard.description',
			'education_standards.10.education_standard.description',
			'education_standards.0.education_standard.standards_group',
			'education_standards.1.education_standard.standards_group',
			'education_standards.2.education_standard.standards_group',
			'education_standards.3.education_standard.standards_group',
			'education_standards.4.education_standard.standards_group',
			'education_standards.5.education_standard.standards_group',
			'education_standards.6.education_standard.standards_group',
			'education_standards.7.education_standard.standards_group',
			'education_standards.8.education_standard.standards_group',
			'education_standards.9.education_standard.standards_group',
			'education_standards.0.education_standard.alt_standards_group',
			'education_standards.1.education_standard.alt_standards_group',
			'education_standards.2.education_standard.alt_standards_group',
			'education_standards.3.education_standard.alt_standards_group',
			'education_standards.4.education_standard.alt_standards_group',
			'education_standards.5.education_standard.alt_standards_group',
			'education_standards.6.education_standard.alt_standards_group',
			'education_standards.7.education_standard.alt_standards_group',
			'education_standards.8.education_standard.alt_standards_group',
			'education_standards.9.education_standard.alt_standards_group',
			'education_standards.0.education_standard.lower_grade',
			'education_standards.1.education_standard.lower_grade',
			'education_standards.2.education_standard.lower_grade',
			'education_standards.3.education_standard.lower_grade',
			'education_standards.4.education_standard.lower_grade',
			'education_standards.5.education_standard.lower_grade',
			'education_standards.6.education_standard.lower_grade',
			'education_standards.7.education_standard.lower_grade',
			'education_standards.8.education_standard.lower_grade',
			'education_standards.9.education_standard.lower_grade',
			'education_standards.10.education_standard.lower_grade',
			'education_standards.0.education_standard.upper_grade',
			'education_standards.1.education_standard.upper_grade',
			'education_standards.2.education_standard.upper_grade',
			'education_standards.3.education_standard.upper_grade',
			'education_standards.4.education_standard.upper_grade',
			'education_standards.5.education_standard.upper_grade',
			'education_standards.6.education_standard.upper_grade',
			'education_standards.7.education_standard.upper_grade',
			'education_standards.8.education_standard.upper_grade',
			'education_standards.9.education_standard.upper_grade',
			'education_standards.0.education_standard.subjects.0.label',
			'education_standards.1.education_standard.subjects.0.label',
			'education_standards.2.education_standard.subjects.0.label',
			'education_standards.3.education_standard.subjects.0.label',
			'education_standards.4.education_standard.subjects.0.label',
			'education_standards.5.education_standard.subjects.0.label',
			'education_standards.6.education_standard.subjects.0.label',
			'education_standards.7.education_standard.subjects.0.label',
			'education_standards.8.education_standard.subjects.0.label',
			'education_standards.9.education_standard.subjects.0.label',
			'education_standards.0.education_standard.standards_path.0.description',
			'education_standards.0.education_standard.standards_path.1.description',
			'education_standards.1.education_standard.standards_path.0.description',
			'education_standards.1.education_standard.standards_path.1.description',
			'education_standards.2.education_standard.standards_path.0.description',
			'education_standards.2.education_standard.standards_path.1.description',
			'education_standards.3.education_standard.standards_path.0.description',
			'education_standards.3.education_standard.standards_path.1.description',
			'education_standards.4.education_standard.standards_path.0.description',
			'education_standards.4.education_standard.standards_path.1.description',
			'education_standards.5.education_standard.standards_path.0.description',
			'education_standards.5.education_standard.standards_path.1.description',
			'education_standards.6.education_standard.standards_path.0.description',
			'education_standards.6.education_standard.standards_path.1.description',
			'education_standards.7.education_standard.standards_path.0.description',
			'education_standards.7.education_standard.standards_path.1.description',
			'education_standards.8.education_standard.standards_path.0.description',
			'education_standards.8.education_standard.standards_path.1.description',
			'education_standards.9.education_standard.standards_path.0.description',
			'education_standards.9.education_standard.standards_path.1.description'
		],
		td3: [
			'title',
			'description',
			'background_for_students',
			'curriculum.course_name',
			'curriculum.lower_grade',
			'curriculum.upper_grade',
			'curriculum.discipline.name',
			'texts.count',
			'texts.0.class_name',
			'texts.1.class_name',
			'texts.2.class_name',
			'texts.3.class_name',
			'texts.4.class_name',
			'texts.0.name',
			'texts.1.name',
			'texts.2.name',
			'texts.3.name',
			'texts.4.name'
		],
		td4: [
			'title',
			'description',
			'curriculum.course_name',
			'curriculum.lower_grade',
			'curriculum.upper_grade',
			'curriculum.discipline.name',
			'teaching_task.substitutions',
			'teaching_task.template.writing_type.name',
			'teaching_task.template.writing_sub_type.name'
		]
	};

	// -----------------------------------------------------------------------------------------------------------------

	// add column names to config
	for (var key in config) {
		if (config.hasOwnProperty(key)) {
			var prefix = key.slice(0, 3);
			config[key].columnNames = columnNames[prefix] || [];
		}
	}

	// done
	return config;

})();