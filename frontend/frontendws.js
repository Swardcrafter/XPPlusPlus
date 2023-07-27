const ws = new WebSocket("wss://obsidian-syncify-main.saturnwillow.repl.co/echo");

function send(data) {
	ws.send(JSON.stringify(data));
}

ws.addEventListener("open", () => {
    console.log("We are connected");   
});

ws.addEventListener("message", msg => {
    msg = JSON.parse(msg);
});

function handleFormSubmit(event) {

    // Get the form data using FormData API
    const form = event.target;
    const formData = new FormData(form);

    // Convert the FormData object to a regular object
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    // Convert the object to JSON
    const jsonData = JSON.stringify(formDataObj);

	if(jsonData.password != jsonData.confirmpassword) {
		setInputError(inputElement, "Passwords do not match.");
	}

    console.log(jsonData);
    
 }

 const formsContainer = document.getElementById('formsContainer');

 // Add the event listener to the forms container for form submissions
 formsContainer.addEventListener('submit', handleFormSubmit);