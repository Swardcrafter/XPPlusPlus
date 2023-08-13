const ws = new WebSocket("wss://loopwebgenerator.saturnwillow.repl.co/echo");


function send(data) {
	ws.send(JSON.stringify(data));
}

ws.addEventListener("open", () => {
    console.log("We are connected");   
});

function setOutput(data) {
	const outputElement = document.getElementById("output-text");
	outputElement.innerText = data;
}

ws.addEventListener("message", msg => {
    msg = JSON.parse(msg.data);
		console.log(`Server sent us: ${JSON.stringify(msg)}.`);
		if(msg.type == "output") {
			setOutput(msg.data);
		}
});