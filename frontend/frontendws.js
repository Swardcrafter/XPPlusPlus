const ws = new WebSocket("wss://Obsidian-Syncify-Main.saturnwillow.repl.co/echo");

ws.addEventListener("open", () => {
    console.log("We are connected");      
});

ws.addEventListener("message", msg => {
    msg = JSON.parse(msg);
});
