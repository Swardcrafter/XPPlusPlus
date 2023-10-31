const ws = new WebSocket("wss://xpplusplus.saturnwillow.repl.co/echo");


ws.addEventListener("open", () => {
    console.log("We are connected");   
});


ws.addEventListener("message", msg => {
    msg = JSON.parse(msg.data);
	console.log(`Server sent us: ${JSON.stringify(msg)}.`);
});