const ws = new WebSocket("wss://obsidian-syncify-main.saturnwillow.repl.co/echo");

let loggedUsername = "";
let loggedPassword = "";

const style1 = document.getElementById("style1");
const style2 = document.getElementById("style2");

style2.disabled = true;

document.getElementById("main").style.display = 'none';

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
		console.log(`Server sent us: ${JSON.stringify(msg)}.`);
    if(msg.type == "error") {
        if(msg.error == "usernameExists") {
            inputElement = document.getElementById("usernameInput");
            setInputError(inputElement, "An account with that username already exists.");
        } else if (msg.error == "noAccount") {
            inputElement = document.getElementById("usernameInputLog");
            setInputError(inputElement, "No account exists with that username.");
        } else if (msg.error == "wrongPassword") {
            inputElement = document.getElementById("passwordInputLog");
            setInputError(inputElement, "Incorrect password, try again.");
        }
    } else if (msg.type == "log") {
        document.getElementById("main").style.display = 'block';
        document.getElementById("formsContainer").style.display = 'none';
        style1.disabled = true;
        style2.disabled = false;
        msg.userInfo.files.forEach((element) => {
            createBar(element);
        });
    }
});

function createBar(text) {
    const barsContainer = document.getElementById("bars-container");
    const bar = document.createElement("a");
    bar.href = "#";
    bar.className = "bar";

    const label = document.createElement("label");
    label.className = "checkbox-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    const checkmark = document.createElement("span");
    checkmark.className = "checkmark";

    label.appendChild(checkbox);
    label.appendChild(checkmark);

    const barContent = document.createElement("div");
    barContent.className = "bar-content";
    barContent.textContent = text;

    bar.appendChild(label);
    bar.appendChild(barContent);

    barsContainer.appendChild(bar);

    // Add a click event listener to the checkbox and prevent event propagation
    checkbox.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Add a click event listener to the bar element
    bar.addEventListener("click", () => {
        // Check the checkbox programmatically when clicking the bar
        checkbox.checked = !checkbox.checked;
        // Call the function when the bar is clicked and pass in the text inside the bar
        downloadFile(text);
    });
}

function downloadFile(filename) {
    ws.send(JSON.stringify({
        type: "download",
        info: {
            filename: filename
        }
    }));
}

document.getElementById("uploadButton").addEventListener("click", () => {
              document.getElementById("fileInput").click();
            });

function removeBars() {
  const bars = document.getElementsByClassName('bar');
  const filenamesToDelete = []; // Array to store filenames to delete

  for (let i = bars.length - 1; i >= 0; i--) {
    const checkbox = bars[i].querySelector('.checkbox');
    if (checkbox.checked) {
      const filename = bars[i].querySelector('.bar-content').textContent;
      filenamesToDelete.push(filename); // Store the filename to delete
      bars[i].remove();
    }
  }

  // Send filenames to delete to the server
  filenamesToDelete.forEach((filename) => {
    ws.send(JSON.stringify({
      type: "delete",
      info: {
        filename: filename
      }
    }));
  });
}
        
document.getElementById("fileInput").addEventListener("change", (event) => {
  const files = event.target.files;
  for (const file of files) {
    const filename = file.name;
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const fileContent = e.target.result;
      createBar(filename);
      ws.send(JSON.stringify({
        type: "file",
        info: {
          filename: filename,
          contents: fileContent
        }
      }));
    };

    // Read the file as text
    reader.readAsText(file);
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