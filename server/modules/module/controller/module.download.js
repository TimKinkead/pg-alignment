'use strict';

/**
 * Download modules from LDC core tools api.
 * - Get access token. (required for some modules)
 * - Get data from api. (ex: https://api.ldc.org/api/v1/mods/ec303d00-29de-4b26-9f69-bb31034a81b1)
 * - Save data to related module doc.
 */

//----------------------------------------------------------------------------------------------------------------------
// Mongoose Models

var mongoose = require('mongoose'),
	Module = mongoose.model('Module'),

//----------------------------------------------------------------------------------------------------------------------
// Dependencies
	
	phantom = require('phantom'),
	request = require('request'),

//----------------------------------------------------------------------------------------------------------------------
// Variables
	
	auth = require('../../../../auth.js'),
	
//----------------------------------------------------------------------------------------------------------------------
// Controllers
	
	error = require('../../error'),
	logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Methods

/**
 * GET LDC ACCESS TOKEN
 * - Use Phantom to login to LDC core tools.
 * - Grab access token for pulling modules via LDC api.
 * @param clbk - return clbk(err, token)
 */
function getLDCAccessToken(clbk) {
	logger.dash('getting ldc access token');
	
	// start phantom
	logger.arrow('starting phantom');
	phantom.create().then(function(ph) {

		// create phantom page object
		logger.arrow('creating phantom page');
		ph.createPage().then(function(page) {

			// -- PHANTOM PAGE SETTINGS --

			// print log statements from web page
			page.property('onConsoleMessage', function(msg, lineNum, sourceId) {
				var message = 'CONSOLE: ' + msg + (!lineNum && !sourceId ? '' : ' (from line #' + lineNum + ' in "' + sourceId + '")');
				console.log(message);
			});

			// set viewport size
			page.property('viewportSize', {width: 1000, height: 800});

			// track networking requests/responses
			/*page.property('onResourceRequested', function(requestData, networkRequest) {
			 console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
			 });
			 page.property('onResourceReceived', function(response) {
			 console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
			 });*/

			// -- LOGIN --

			// open login page
			logger.arrow('navigating to login page');
			page.open('https://coretools.ldc.org/login').then(function(status) {
				if (status !== 'success') {
					clbk(new Error('status ==='+status));
					ph.exit();
					return;
				}

				// render login page
				page.render('temp/1-login-page-blank.png');

				// login function
				function loginOnPage(userEmail, userPassword) {
					var emailField = document.getElementById('loginEmail'),
						passwordField = document.getElementById('loginPassword'),
						loginForm = document.getElementsByName('loginForm')[0],
						loginButton = loginForm.getElementsByTagName('button')[0];

					emailField.value = userEmail;
					emailField.dispatchEvent(new Event('input'));

					passwordField.value = userPassword;
					passwordField.dispatchEvent(new Event('input'));

					loginButton.click();
				}

				// perform login
				logger.arrow('logging in');
				page.evaluate(loginOnPage, auth.ldcCoreToolsEmail, auth.ldcCoreToolsPassword).then(function() {

					// render logging in page
					page.render('temp/2-logging-in.png');

					// render logged in page
					setTimeout(function() { page.render('temp/3-logged-in.png'); }, 5000);

					// grab access token
					logger.arrow('grabbing access token');
					page.evaluate(function() {
						var accessToken = localStorage.getItem('ldcEdit.accessToken');
						while (accessToken.indexOf('"') > -1) {
							accessToken = accessToken.replace('"', '');
						}
						return accessToken;
					}).then(function(token) {

						// close phantom
						setTimeout(function() { ph.exit(); }, 5000);

						// done
						logger.arrow('done');
						return clbk(null, token);
					});
				});
			});
		});
	});
}

/**
 * DOWNLOAD MODULE
 * - Download data for a single module from ldc core tools api.
 * @param module - module doc
 * @param token - access token for ldc core tools api
 * @param clbk - return clbk(err)
 */
function downloadModule(module, token, clbk) {
	if (!module) {
		return clbk(new Error('!module'));
	} else if (!module.ldcId) {
		return clbk(new Error('!module.ldcId'));
	} else if (!token) {
		return clbk(new Error('!token'));
	}

	// get module data from ldc core tools api
	request.get(
		{
			url: 'https://api.ldc.org/api/v1/mods/'+module.ldcId,
			headers: {
				Authorization: 'Bearer '+token
			}
		},
		function(err, response, body) {

			// error
			if (err) {
				err = new Error(err);
				err.module = module;
				return clbk(err);
			}

			// download error
			if (response.statusCode !== 200) {
				Module.update(
					{ldcId: module.ldcId},
					{$set: {
						'downloadError.statusCode': response.statusCode,
						'downloadError.body': body
					}},
					function(err) {
						if (err) {
							return clbk(new Error(err));
						}

						// done
						err = new Error('statusCode !== 200');
						err.module = module;
						return clbk(err);
					}
				);
				return;
			}

			// download error
			if (!body) {
				err = new Error('!body || !body.mod');
				err.module = module;
				return clbk(err);
			}

			// parse response body
			var bodyData;
			try {
				bodyData = JSON.parse(body);
			} catch(e) {
				err = new Error(e);
				err.module = module;
				return clbk(err);
			}

			// body format error
			if (!bodyData.mod) {
				err = new Error('!bodyData.mod');
				err.module = module;
				return clbk(err);
			}

			// update module
			Module.update(
				{ldcId: module.ldcId},
				{$set: {
					ldcData: bodyData.mod,
					modified: new Date()
				}},
				function(err) {
					if (err) {
						return clbk(new Error(err));
					}

					// done
					return clbk();
				}
			);
		}
	);
}

/**
 * DOWNLOAD MODULES
 * - Queue handler for downloading data for modules from ldc core tools api.
 * @param modules - array of module docs
 * @param token - access token for ldc core tools api
 */
function downloadModules(modules, token) {
	logger.dash('downloading modules');

	if (!modules || !modules.length) {
		error.log(new Error('!modules || !modules.length'));
		return;
	}
	if (!token) {
		error.log(new Error('!token'));
		return;
	}

	var moduleIndex = -1, 
		errors = 0;
	
	function nextModule() {
		
		moduleIndex++;
		if (moduleIndex >= modules.length) {
			logger.arrow('done');
			return;
		}

		downloadModule(modules[moduleIndex], token, function(err) {
			if (err) {
				//error.log(err);
				errors += 1;
				/*if (errors > 10) {
					logger.arrow('stopping: errors > 10');
					return;
				}*/
			}
			if (moduleIndex%10 === 0) {
				logger.arrow(moduleIndex+' ('+Math.round((moduleIndex/modules.length)*100)+'%) - '+
					'success: '+moduleIndex-errors+' - '+
					'errors: '+errors);
			}
			nextModule();
		});
	}
	
	// start
	nextModule();
}

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * MODULE.DOWNLOAD
 * - Download data for modules from LDC core tools api.
 */
exports.download = function(req, res) {
	logger.filename(__filename);

	// get modules
	var query = {
		ldcId: {$exists: true},
		'ldcData.uuid': {$exists: false},
		'downloadError.statusCode': {$exists: false}
	};
	logger.dash('getting modules');
	Module.find(query)
		.select('_id ldcId')
		.exec(function(err, moduleDocs) {
			if (err) {
				error.log(new Error(err));
				return res.status(500).send(err);
			}
			if (!moduleDocs || !moduleDocs.length) {
				error.log(new Error('!moduleDocs || !moduleDocs.length'));
				return res.status(500).send('!moduleDocs || !moduleDocs.length');
			}
			logger.arrow(moduleDocs.length+' modules');
			
			// get ldc core tools api access token
			getLDCAccessToken(function(err, token) {
				if (err) {
					error.log(err);
					return res.status(500).send(err);
				}
				if (!token) {
					error.log(new Error('!token'));
					return res.status(500).send('!token');
				}

				logger.bold('token: '+token);
				
				// download modules
				downloadModules(moduleDocs, token);
				
				// respond
				return res.status(200).send('Working on downloading modules.');
			});
		});
};