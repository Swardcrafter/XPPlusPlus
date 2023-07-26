// File 2

const ws = new WebSocket("wss://Obsidian-Syncify-Main.saturnwillow.repl.co/echo");

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