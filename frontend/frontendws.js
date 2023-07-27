const ws = new WebSocket("wss://obsidian-syncify-main.saturnwillow.repl.co/echo");

function send(data) {
	ws.send(JSON.stringify(data));
}

ws.addEventListener("open", () => {
    console.log("We are connected");   
});

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

ws.addEventListener("message", msg => {
    msg = JSON.parse(msg.data);
    if(msg.type == "error") {
        if(msg.error == "usernameExists") {
            inputElement = document.getElementById("usernameInput");
            setInputError(inputElement, "An account with that username already exists.");
        }
    }
});

function logIn(username, password) {
    send({
        type: "log",
        info: {
            username: username, 
            password: password
        }
    });
}

function signUp(username, email, password) {
    send({
        type: "sign",
        info: {
            username: username,
            email: email, 
            password: password
        }
    });
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
        logIn(formDataObj.username, formDataObj.password);
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