'use strict';

module.exports = (function() {

	var indicators = [
		{
			id: 'td1a',
			scores: [
				{no: 1, description: 'Template type uses a writing mode that does not match the intended purpose of the prompt.'},
				{no: 2, description: 'Template task uses a writing mode that matches the intended purpose of the prompt.'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360?#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.2c2123c403c745fc94d3826a08b558ad/ViewExperiment',
			apiKey: '9WTgtUJrve8VWKiT0qvfYL6VNXn8D3hLMEr15twLVcLQvWIjrwa9jHYSuuJEzOI7Mf8QeM/HfCHJChZ43CLoQQ==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/19674c5fd8b348acac70ba6a6396ebff/endpoints/07bb8d3097744df0b98297e03190754f/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/07bb8d3097744df0b98297e03190754f/execute?api-version=2.0&details=true'
		},
		{
			id: 'td1b',
			scores: [
				{no: 1, description: 'Task purpose is overly broad or narrow.'},
				{no: 2, description: 'Task purpose is focused.'},
				{no: 3, description: 'Task is worded precisely to give students a clear and focused purpose for writing and unambiguous directions.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.048d469cc0f84885b46178c323fe6936/ViewExperiment',
			apiKey: 'XiOcoOVVQ6le2mL9fE7b1dpuJnPlk8bxiVup9SoFKOB1ojl4WwoCVnsQ1g+8qysGIUDZL/V7NfzyJrjNPHfZfA==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/40ccaa8389314eeea6365db8bfc33011/endpoints/7ce3283a4cb2430bbe014e7f0b31cb64/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/7ce3283a4cb2430bbe014e7f0b31cb64/execute?api-version=2.0&details=true'
		},
		{
			id: 'td1c',
			scores: [
				{no: 1, description: 'Prompt wording is unclear.'},
				{no: 2, description: 'Prompt wording is clear.'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.74f23bf84ede44b087fa911a94fcac42/ViewExperiment',
			apiKey: 'BIJzNiwHm7GyZvmiWZlbeKkSHl+P21o2rv2Ov6vHEJA/De+3YpaFUT5oIfbHgQl+qroEGEeS3knV4NfIArZt5w==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/450147bd492a4de6879c296aed21ad2e/endpoints/8c1878fbc01d41b4b300dd7d96f5b663/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/8c1878fbc01d41b4b300dd7d96f5b663/execute?api-version=2.0&details=true'
		},
		{
			id: 'td1d',
			scores: [
				{no: 1, description: 'Prompt wording, student background, or overview of the task biases students toward a particular response.'},
				{no: 2, description: 'Prompt wording is unbiased, leaving room for diverse responses.'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.e7d9afed32ec47689809a12d1cedff85/ViewExperiment',
			apiKey: '0hgwodjGQ6GFdDs1qEyov9NsqHhuoHCGf35mNSXhJhUKvR35/l5GJsnPZ0/AU10syNFJaFW90kCDBp5vu+r6gA==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/b89fdb7a362e4fac814744c4d6006cfc/endpoints/2cf6fd828bf04d9cb8ec737a385d368f/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/2cf6fd828bf04d9cb8ec737a385d368f/execute?api-version=2.0&details=true'
		},
		{
			id: 'td1e',
			scores: [
				{no: 1, description: ''},
				{no: 2, description: 'Prompt wording, content, texts, and writing product are aligned to task purpose (a good fit).'},
				{no: 3, description: 'Prompt, texts, content, and writing product are tightly aligned (are close to a perfect fit) to task purpose.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.63f27bc107574302adf34ca47f54a803/ViewExperiment',
			apiKey: 'pmlI5NwKcknWqOjS9JtjzLTJ9ep7cAbh8vDhWTPSm1A0Sd+dHppvg/h57B/tkXVv1rcuwplS2aVvizaPVD6Cxg==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/98625de21fc640b8b0268d83e58f2829/endpoints/597043bfb27c4e66b28768806f287184/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/597043bfb27c4e66b28768806f287184/execute?api-version=2.0&details=true'
		},
		{
			id: 'td1f',
			scores: [
				{no: 1, description: 'Task is answerable without using the texts or instructional scaffolding in module.'},
				{no: 2, description: 'Task is text dependent, requiring students to go beyond prior knowledge to use evidence from the texts in their responses.'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.78dd87d84f5e457a8dcbcb6245706212/ViewExperiment',
			apiKey: 'jUrg75b7VHs9dxnLWY+otuWdGbGiRg9t+Fs90U6gA/xpGKFCRIt+SCmjtFCekcKfN4a7MNj0Zfkr99GJwf3wDA==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/a094111db7814e1ea8aefd6b51535796/endpoints/25dfaa966b7c45319c08887aa3da8ddc/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/25dfaa966b7c45319c08887aa3da8ddc/execute?api-version=2.0&details=true'
		},
		{
			id: 'td1g',
			scores: [
				{no: 1, description: 'Background statement may not frame task for students.'},
				{no: 2, description: 'Background statement frames task for students.'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.1e72e5ed96c9442288e7db642cda70db/ViewExperiment',
			apiKey: 'aMCIr1bkUN8hSaD+XLv7LmFVXICIjvU+DcW64KZ5PecwE1UsiilzRDctFQl0CmAjeSDyjDYw5ATpuvZrPL6mtw==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/5b5133ab386a467d9162e19421d1be96/endpoints/5c695ce259a3465da9889fd605c287e8/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/5c695ce259a3465da9889fd605c287e8/execute?api-version=2.0&details=true'
		},
		{
			id: 'td1h',
			scores: [
				{no: 1, description: ''},
				{no: 2, description: ''},
				{no: 3, description: 'Task provides a pattern that can be used as a model to create other teaching tasks in the discipline.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.258f974aefd74779985781654c45603a/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'td2a',
			scores: [
				{no: 1, description: 'Has a weak connection to content central to the discipline.'},
				{no: 2, description: 'Addresses content central to the discipline and grade level CCSS reading standards, requiring students to build strong content knowledge.'},
				{no: 3, description: 'Addresses big ideas or enduring understandings central to the discipline.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.3fdf085bca6b41a69c68f656a35a3fa4/ViewExperiment',
			apiKey: 'J2ysSj+SkiDOnon6Ojlh27dyZbp4lIszqQ3c9rOl5TrnxwZUEcbgGHoaM22sJlneNAF5QcANd+9nGFmK7jcRiw==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/d74df8afe295406b898bce66d1e74930/endpoints/50f6c5dcc2cb492ca790545ca8a4c380/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/50f6c5dcc2cb492ca790545ca8a4c380/execute?api-version=2.0&details=true'
		},
		{
			id: 'td2b',
			scores: [
				{no: 1, description: 'Oversimplifies a topic, OR does not require students to engage in analytic reading and thinking skills.'},
				{no: 2, description: 'Engages students in a range of analytic reading and thinking skills.'},
				{no: 3, description: 'Engages students in complex, higherorder thinking skills specific to the discipline.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.17dfa6126fa94134889955214bb07b1a/ViewExperiment',
			apiKey: 'bCewvY4WRFrE+wBzT4oIPZQn+MvXTXEONbnBIf+rttZ0TEOusZltj5ypnHkzKh1sk8FQQgQZiXTIKt/VGBCsZw==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/04b62716486d460096a3e5086443cee4/endpoints/93dcdae1c09344959fe4eb32a11e29c1/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/93dcdae1c09344959fe4eb32a11e29c1/execute?api-version=2.0&details=true'
		},
		{
			id: 'td2c',
			scores: [
				{no: 1, description: 'Includes content or skill standards that are not relevant the task.'},
				{no: 2, description: ''},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.35ed4c48ecc948f181cddf5c262acbcb/ViewExperiment',
			apiKey: 'qfeRtXwrdBX/TcQIcAd9OgJVg5uiBvw1gnxlKOsG+usM42DHMqTJEFHADk+E55Pihc36/eO+9KlJgeFcCJzVfA==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/ae77a14a0fed436bbb1e4b317b0e3b6e/endpoints/4e280bbdc09f4792a817a280d5e61399/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/4e280bbdc09f4792a817a280d5e61399/execute?api-version=2.0&details=true'
		},
		{
			id: 'td3a',
			scores: [
				{no: 1, description: 'Are loosely aligned or misaligned to the purpose of the task.'},
				{no: 2, description: 'Are useful for providing content and evidence to be used in addressing the task.'},
				{no: 3, description: 'Are tightly aligned to the task purpose.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.e5f9c118604e4decb5ee7fd6e38d88b3/ViewExperiment',
			apiKey: 'ZqBfcPrAv4CzefKSU0C6dJBa1PG5JC3zxU+xbTjUixAN21M1+hZbolb1XXnPRKepxV6ZNCdWQDMXUb6VnJyKlQ==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/2bdb6953d76749d094cd94cc3743ef30/endpoints/6be0765a2a4846b2b67e32ea5a5bb202/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/6be0765a2a4846b2b67e32ea5a5bb202/execute?api-version=2.0&details=true'
		},
		{
			id: 'td3b',
			scores: [
				{no: 1, description: 'Bias students toward a particular response.'},
				{no: 2, description: 'Do not bias students toward a particular response.'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.6b4a7c688ee24d0d860331558f206f29/ViewExperiment',
			apiKey: 'yMX1JD2liV5rqz9/iBeijtd1lipvnnEHDjoTAULmXmOHM7THwuvxydXh3mB96N1uHSjp52q06gBYSCpvs5JAfw==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/e4c8ff35a1c44b01b7444db9060799a1/endpoints/0044702adbdd4ea387213101ab834d0b/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/0044702adbdd4ea387213101ab834d0b/execute?api-version=2.0&details=true'
		},
		{
			id: 'td3c',
			scores: [
				{no: 1, description: 'Are too difficult or too easy for the range of student ability.'},
				{no: 2, description: 'Are accessible to most target students and appropriately complex, requiring them to apply grade level CCSS reading skills to comprehend and analyze content.'},
				{no: 3, description: 'Are carefully selected, excerpted, or modified to provide texts with varied complexity (using either quantitative or qualitative measures) appropriate to students\' reading ability.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.738e5c2992944bc888f9f44b89a60f12/ViewExperiment',
			apiKey: 'otle2TfuKo1q4Ozsw64waniJvlLVET5bf9+Vpb8lYvGLTMuPjIhF714THKHk+Ax6msRFmDdoyc1s+NfIASAZvQ==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/544a46532f504fe08b2147663e3c27ef/endpoints/33f2a94ce6e54fc0b6485d3d0c0e9374/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/33f2a94ce6e54fc0b6485d3d0c0e9374/execute?api-version=2.0&details=true'
		},
		{
			id: 'td3d',
			scores: [
				{no: 1, description: 'Include so many texts or allow so much student choice that it will be difficult to support reading closely and provide appropriate instruction.'},
				{no: 2, description: ''},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.9b198c56c8454e498dba0d23b8970f54/ViewExperiment',
			apiKey: 'CycXJiSMqXQiiHMapl4XYJ5ipt+MAhezdYSaCsSJY8HAD7zoZf42ZAkx+XJDvq+ZayxUG7rW3yJnTiMu/8N3yw==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/8e7d5acc5f8b4338a95821c1089abbc4/endpoints/fd6d921daa5d46ef94f44bf0bcc5780f/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/fd6d921daa5d46ef94f44bf0bcc5780f/execute?api-version=2.0&details=true'
		},
		{
			id: 'td3e',
			scores: [
				{no: 1, description: ''},
				{no: 2, description: ''},
				{no: 3, description: 'Are engaging, tightly relevant (indispensable), and authentic.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.8f5e84b83f064ea788f4593846bdbba0/ViewExperiment',
			apiKey: 'pjZ2+PchUjAAlgjVSmifW7pNiC4RKRiF858iK9IFqgCbxVE7mV4jY9cCtnY7dqbipgpAiZDWli6CvFYErkYyjQ==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/fdfc1b72b1d64cc9a8b6c8e78147603d/endpoints/d4a99807d78b4792926d0a6ab8255ebe/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/d4a99807d78b4792926d0a6ab8255ebe/execute?api-version=2.0&details=true'
		},
		{
			id: 'td3f',
			scores: [
				{no: 1, description: ''},
				{no: 2, description: ''},
				{no: 3, description: 'Represent central modes of discourse in the discipline.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.6fb25cd7aaae48ffb5fa4db8d2195e31/ViewExperiment',
			apiKey: '53qzhuQ4tal1ckTZFBcgSHGII7gAgRo9so9E0KXtAa80tegHL/YaRvi5bfP/bIY+GkuzRniIzUtqMBlIE9masw==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/00fd52fbb8d2415aa052aa0a58d153ff/endpoints/c5b7d01d17df4e33aaa6ceacf7a38167/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/c5b7d01d17df4e33aaa6ceacf7a38167/execute?api-version=2.0&details=true'
		},
		{
			id: 'td4a',
			scores: [
				{no: 1, description: 'Is inappropriate to the discipline, content, or challenge of the task.'},
				{no: 2, description: 'Is appropriate for the discipline and content, and coherent with the purpose of the task.'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.545e0642a34b4601a220ab000f9806b3/ViewExperiment',
			apiKey: 'LMBLVAPzfDDBsmmx/8Hu9RFEqCOt6g1sPprO8OHXuta2NmDn04q7SYQQuakoxXNIxdy7T1qb3KqwaEw689EWGA==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/3446bf3efd994623b7b15a29cb964453/endpoints/d8243de72e8e4c96949ce2702f5192e9/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/d8243de72e8e4c96949ce2702f5192e9/execute?api-version=2.0&details=true'
		},
		{
			id: 'td4b',
			scores: [
				{no: 1, description: 'Is too difficult or too easy for the range of student ability.'},
				{no: 2, description: 'Is accessible to all students and intellectually challenging, requiring them to apply CCSS writing skills to demonstrate their content understanding and CCSS reading skills.'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.191a20440b284ffda882b9588aa3d36a/ViewExperiment',
			apiKey: '7+Nmjyl8l8TW0R+IijDCYTScfIhqbmkLhP6rg3P0RKFtUgxkJfd2DJ0zep5Vuzt6432S6YreWP1/KuR6nW9CqQ==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/2c09d265aafe4244a55e6b7b0c8ae7e5/endpoints/adffc22e29c448888407f18e110c118a/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/adffc22e29c448888407f18e110c118a/execute?api-version=2.0&details=true'
		},
		{
			id: 'td4c',
			scores: [
				{no: 1, description: ''},
				{no: 2, description: ''},
				{no: 3, description: 'Authentically engages students in rhetorical modes and types of writing central to the discipline.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.ef1e1b10ecd3449ea5fd37b3431899a8/ViewExperiment',
			apiKey: 'l0YL3C3NcSo7hGlBlTJNr5H4OrDLuMenYtL+nLxDDlsiGwNGbRZwQc0yQDvoum65MMiMbIXlgUysfuurTgQgYA==',
			apiDocs: 'https://studio.azureml.net/apihelp/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/webservices/cb9bbadb663641669e75c199930aab89/endpoints/63e5c351c57f4bad8cf846c157458c2d/score',
			apiEndpoint: 'https://ussouthcentral.services.azureml.net/workspaces/7aca5167d93d4ab2b0d08cdd0dbc0360/services/63e5c351c57f4bad8cf846c157458c2d/execute?api-version=2.0&details=true'
		},
		{
			id: 'ld1a',
			scores: [
				{no: 1, description: 'Skills list misses one or more significant demands of the task.'},
				{no: 2, description: 'Skills list is relevant to teaching task, (including the task prompt, content, discipline, text(s), and writing product).'},
				{no: 3, description: 'Skills list is precise and tightly aligned to the task and the demands of the texts.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.64fb7c2b9f2c4b08811a1c314f5360a4/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld1b',
			scores: [
				{no: 1, description: 'Skills are not clustered and sequenced to support the teaching task.'},
				{no: 2, description: 'Skills are clustered and sequenced to support the teaching task.'},
				{no: 3, description: 'Skills are clustered and sequenced to support access to the texts and completion of the teaching task product.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.095e4999c8fd475ebb7b7d04ef449642/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld1c',
			scores: [
				{no: 1, description: 'Skills list reflects the default skills list and includes skills that are not relevant to the teaching task.'},
				{no: 2, description: 'Skills list includes gradelevel appropriate reading, writing, and thinking skills.'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.941947133de642eba57dcbabcb8ef462/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2a',
			scores: [
				{no: 1, description: 'Some minitasks (product, prompt, and scoring guide) do not relate to skills list.'},
				{no: 2, description: 'Minitasks (product, prompt, and scoring guide) relate to skills list.'},
				{no: 3, description: 'Minitasks and instructional strategies are coherent, tightly aligned to the skills, and well designed to support student success on the teaching task.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.b474c8bcfc8f44f392d4eac84e8eee99/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2b',
			scores: [
				{no: 1, description: 'Minitasks rely on general strategies that provide weak support for the skills, texts, and teaching task OR provide too much support, removing any challenge for students.'},
				{no: 2, description: 'Minitasks support the teaching task (including the prompt, content, discipline, text(s), and writing product).'},
				{no: 3, description: 'Minitasks and instructional strategies are coherent, tightly aligned to the skills, and well designed to support student success on the teaching task.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.7d21c45c0ceb476f878991cccaaa9e55/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2c',
			scores: [
				{no: 1, description: 'Instructional strategies are loosely connected to minitasks and completion of the teaching task.'},
				{no: 2, description: 'Instructional strategies support the minitasks and completion of the teaching task, (and are aligned to prompt, content, discipline, text(s), and writing product).'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.a0a287f227374d14887e3fcc4a59ea76/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2d',
			scores: [
				{no: 1, description: ''},
				{no: 2, description: 'Minitasks and instructional strategies provide opportunities for students to learn specified grade level CCSS reading, writing, and thinking skills.'},
				{no: 3, description: 'Minitasks and instructional strategies explicitly build student capacity to apply disciplinespecific literacy skills to complex texts.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.7eaa3b322c9a4163b721d0b77f4136bd/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2e',
			scores: [
				{no: 1, description: ''},
				{no: 2, description: ''},
				{no: 3, description: 'Minitasks and instructional strategies explicitly build student capacity to produce clear and coherent writing appropriate to discipline, task, purpose, and audience.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.22075b49af8945c185b8b17d2ec026e3/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2f',
			scores: [
				{no: 1, description: 'Pacing is not realistic.'},
				{no: 2, description: 'Pacing is realistic.'},
				{no: 3, description: ''}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.1c7fa92240ea46ec8bd85fd83c7963dc/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2g',
			scores: [
				{no: 1, description: 'Materials, references, and supports used in instruction are not available to other teachers.'},
				{no: 2, description: 'Materials, references, and instructional strategies are included, linked, or cited in enough detail to allow other teachers to obtain them.'},
				{no: 3, description: 'Materials, references, and instructional strategies are high quality, customized to the purpose of the teaching task, and described in enough detail for another teacher to use them.'}
			],
			azureStudio: 'https://studio.azureml.net/Home/ViewWorkspaceCached/7aca5167d93d4ab2b0d08cdd0dbc0360#Workspaces/Experiments/Experiment/7aca5167d93d4ab2b0d08cdd0dbc0360.f-id.79962362ff484ba5adbc2317ba19ba67/ViewExperiment',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2h',
			scores: [
				{no: 1, description: 'Module does not present adequate opportunity to teach writing in response to reading.'},
				{no: 2, description: ''},
				{no: 3, description: ''}
			],
			azureStudio: '',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2i',
			scores: [
				{no: 1, description: ''},
				{no: 2, description: ''},
				{no: 3, description: 'Minitasks are well placed to provide formative feedback and give evidence about student progress.'}
			],
			azureStudio: '',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2j',
			scores: [
				{no: 1, description: ''},
				{no: 2, description: ''},
				{no: 3, description: 'Scoring guides for minitasks include clear criteria aligned to the skill being taught.'}
			],
			azureStudio: '',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld2k',
			scores: [
				{no: 1, description: ''},
				{no: 2, description: ''},
				{no: 3, description: 'Texts, minitasks, or instructional strategies are differentiated for diverse learners.'}
			],
			azureStudio: '',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		},
		{
			id: 'ld3a',
			scores: [
				{no: 1, description: 'No student work samples are included.'},
				{no: 2, description: 'Student work samples are included.'},
				{no: 3, description: 'Student work samples representing different score levels are included, with scored rubrics.'}
			],
			azureStudio: '',
			apiKey: '',
			apiDocs: '',
			apiEndpoint: ''
		}
	];

	var holisticCategories = {
		td: 'Task',
		ld: 'Ladder'
	};

	var indicatorCategories = {
		td1: 'Task Clarity & Coherence',
		td2: 'Content',
		td3: 'Text',
		td4: 'Writing Product',
		ld1: 'Skills',
		ld2: 'Instruction',
		ld3: 'Results'
	};
	
	var guidingQuestions = {
		td1: 'Does the teaching task, along with texts, content and writing product, have a clear and coherent purpose and focus, allow for diverse responses, and require students to respond to texts?',
		td2: 'Does the teaching task build students\' content knowledge, enduring understandings, and complex, higher order thinking skills central to the discipline?',
		td3: 'Are the provided text(s) engaging, authentic, accessible, tightly relevant to the prompt, and appropriately complex, requiring students to apply CCSS reading skills?',
		td4: 'Does the teaching task engage students in applying CCSS writing skills to produce writing in a genre that is appropriately challenging, central to the discipline, and appropriate for the task content?',
		ld1: 'Does the Skills List address the specific demands of the teaching task, include CCSS reading and writing skills that are appropriate for the grade level, and support access to the texts and completion of the teaching task?',
		ld2: 'Do the mini-tasks, instructional strategies, and materials provide students with opportunity to develop grade level CCSS reading and writing skills and sufficient support to complete the teaching task successfully?',
		ld3: 'Has the module been taught, and does it include student work samples that have been scored and/or annotated?'
	};
	
	indicators.forEach(function(indicator) {
		if (indicator && indicator.id) {
			var prefix2 = indicator.id.slice(0,2),
				prefix3 = indicator.id.slice(0,3);
			indicator.holisticCategory = holisticCategories[prefix2];
			indicator.indicatorCategory = indicatorCategories[prefix3];
			indicator.guidingQuestion = guidingQuestions[prefix3];
		}
	});

	return indicators;
})();