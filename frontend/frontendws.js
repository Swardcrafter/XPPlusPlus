const ws = new WebSocket("wss://obsidian-syncify-main.saturnwillow.repl.co/echo");

function send(data) {
	ws.send(JSON.stringify(data));
}

ws.addEventListener("open", () => {
    console.log("We are connected");   
});

ws.addEventListener("message", msg => {
    msg = JSON.parse(msg);
    console.log(JSON.stringify(msg));
});

function logIn(email, password) {
    console.log(`Logging in with the following info:\n  - Email: ${email}\n   - Password: ${password}`);
}

function signUp(username, email, password) {
    console.log(`Signing up with the following info:\n  - Username: ${username}\n   - Email: ${email}\n   - Password: ${password}`);
}

function handleFormSubmit(event) {
	event.preventDefault();
    // Get the form data using FormData API
    const form = event.target;
    const formData = new FormData(form);

    // Convert the FormData object to a regular object
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    const dataLength = Object.keys(formDataObj).length;

    if(dataLength == 2) {
        logIn(formDataObj.email, formDataObj.password);
    } else if (dataLength == 3) {
        signUp(formDataObj.username, formDataObj.email, formDataObj.password);
    }

    // Convert the object to JSON
    const jsonData = JSON.stringify(formDataObj);


    console.log(jsonData);
    
 }

 const formsContainer = document.getElementById('formsContainer');

 // Add the event listener to the forms container for form submissions
 formsContainer.addEventListener('submit', handleFormSubmit);