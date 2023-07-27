var express = require('express')
var expressWs = require('express-ws')

var app = express()
expressWs(app)

const fs = require('fs');
var data = fs.readFileSync('backend/db.json');

var db = JSON.parse(data);

function saveDB()
{
  fs.writeFile('backend/db.json', JSON.stringify(db), err=> {if (err) {console.error(err);}});
}

app.ws('/echo', (ws) => {
	console.log("New client connected.");

    ws.on("message", data => {
        data = JSON.parse(data);
		console.log(JSON.stringify(data));
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
app.get("/background.png", (req, res) => {
  res.sendFile(path.join(oneStepBack, "/frontend/background.png"));
});
app.get("/main.php", (req, res) => {
	res.sendFile(path.join(oneStepBack, "/frontend/main.php"));
  });
app.listen(8081, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", 8081);
});