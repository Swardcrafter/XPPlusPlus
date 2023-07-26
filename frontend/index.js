const { send } = require('./frontendws.js');

function handleCredentialResponse(response) {
	send(response);
	console.log(response);
}