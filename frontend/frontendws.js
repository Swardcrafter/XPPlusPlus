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

module.exports = { send };