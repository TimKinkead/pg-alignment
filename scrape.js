'use strict';

var phantom = require('phantom'),
	fs = require('fs'),
	request = require('request');

var moduleUrl = 'https://coretools.ldc.org/mods/ec303d00-29de-4b26-9f69-bb31034a81b1',
	apiUrl = 'https://api.ldc.org/api/v1/mods/ec303d00-29de-4b26-9f69-bb31034a81b1';

var email = 'litdescollab@gmail.com',
	password = 'ldc2014',
	token;

function gotToken() {
	console.log('token = '+token);
	var options = {
		url: 'https://api.ldc.org/api/v1/mods/2b9516f7-8fc6-42b0-9992-6b5d5caba2e6',
		headers: {
			Authorization: 'Bearer '+token
		}
	};
	console.log(JSON.stringify(options));
	request.get(
		options,
		function(err, response, body) {
			if (err) {
				console.log(err);
				return;
			}
			console.log(body);
		}
	);
}

/**
 * - Use phantom to login and grab access token.
 */

// start phantom
phantom.create().then(function(ph) {

	// create phantom page object
	ph.createPage().then(function(page) {

		// -- PHANTOM PAGE SETTINGS --

		// log statements from page
		page.property('onConsoleMessage', function(msg, lineNum, sourceId) {
			var message = 'CONSOLE: ' + msg + (!lineNum && !sourceId ? '' : ' (from line #' + lineNum + ' in "' + sourceId + '")');
			console.log(message);
		});

		// viewport size
		page.property('viewportSize', {width: 1000, height: 800});

		// networking
		/*page.property('onResourceRequested', function(requestData, networkRequest) {
			 console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
		});
		page.property('onResourceReceived', function(response) {
			console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
		});*/

		// -- LOGIN --

		// open login page
		page.open('https://coretools.ldc.org/login').then(function(status) {
			if (status !== 'success') {
				console.log(status);
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
			page.evaluate(loginOnPage, email, password).then(function() {

				// render logging in page
				page.render('temp/2-logging-in.png');

				// render logged in page
				setTimeout(function() { page.render('temp/3-logged-in.png'); }, 5000);

				// grab access token
				page.evaluate(function() {
					var accessToken = localStorage.getItem('ldcEdit.accessToken');
					while (accessToken.indexOf('"') > -1) {
						accessToken = accessToken.replace('"', '');
					}
					return accessToken;
				}).then(function(accessToken) {
					token = accessToken;

					// done
					gotToken();

					// close phantom
					setTimeout(function() { ph.exit(); }, 5000);
				});
			});
		});
	});
});
