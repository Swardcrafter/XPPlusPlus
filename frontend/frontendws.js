const ws = new WebSocket("wss://note-taking-app.LucienDuchateau.repl.co/echo");

ws.addEventListener("open", () => {
    console.log("We are connected");      
});

ws.addEventListener("message", msg => {
    msg = JSON.parse(msg);
});
