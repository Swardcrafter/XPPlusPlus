var express = require('express')
var expressWs = require('express-ws')

var app = express()
expressWs(app)


function splitStringBetweenNumbers(inputString) {
  const regex = /(-?\d+)>(-?\d+)/;
  const match = inputString.match(regex);

  if (match) {
    const firstNumber = parseInt(match[1]);
    const secondNumber = parseInt(match[2]);
    
    return [firstNumber, secondNumber];
  } else {
    return null;
  }
}

function replaceVarName(message, varname, i) {
	const replacer = new RegExp(varname, 'g')
  message = message.replace(replacer, i);
	return message
}


function handleData(data, ws) {
  const someData = splitStringBetweenNumbers(data.varnumb)
  const startingNumb = someData[0]
  const endingNumb = someData[1]
  /*
  type: "message",
		data: {
			varnumb: varnumb,
			varname: varname,
			message: message
		}
  */

  let outputMsg = ""
	console.log(data.varnumb)
	console.log(someData)
	console.log(startingNumb)
	console.log(endingNumb)
  for (let i = startingNumb; i <= endingNumb; i++) {
    outputMsg += replaceVarName(data.message, data.varname, i) + "\n";
  }

  ws.send(JSON.stringify({
		type: "output",
		data: outputMsg
	}))
}


app.ws('/echo', (ws) => {
	console.log("New client connected.");

    ws.on("message", data => {
        data = JSON.parse(data);
		console.log(JSON.stringify(data));
    if(data.type == "message") {
      handleData(data.data, ws);
    }
	});
	ws.on('close', () => {
        console.log(`Client has disconnected!`);
        saveDB();
    });
});

const path=require('path');
let oneStepBack=path.join(__dirname,'../');
app.use("/frontend", express.static(path.join(__dirname, "frontend")));
app.get("/", (req, res) => {
  // Send the index.html file
  res.sendFile(path.join(oneStepBack, "/frontend/index.html"));
});

app.get("/style.css", (req, res) => {
	// Send the styles.css file with the correct MIME type
	res.type("text/css");
	res.sendFile(path.join(oneStepBack, "/frontend/style.css"));
  });

app.get("/frontendws.js", (req, res) => {
	res.setHeader("Content-Type", "application/javascript");
  res.sendFile(path.join(oneStepBack, "/frontend/frontendws.js"));
});
app.get("/index.js", (req, res) => {
	res.setHeader("Content-Type", "application/javascript");
  res.sendFile(path.join(oneStepBack, "/frontend/index.js"));
});
app.listen(8081, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", 8081);
});