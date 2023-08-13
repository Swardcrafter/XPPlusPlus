const ws = new WebSocket("wss://loopwebgenerator.saturnwillow.repl.co/echo");


function send(data) {
	ws.send(JSON.stringify(data));
}

ws.addEventListener("open", () => {
    console.log("We are connected");   
});

ws.addEventListener("message", msg => {
    msg = JSON.parse(msg.data);
		console.log(`Server sent us: ${JSON.stringify(msg)}.`);
});