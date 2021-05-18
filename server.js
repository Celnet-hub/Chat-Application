//import modules
const express = require("express");
const http = require("http");
const path = require("path");
const socket_io = require("socket.io");

//create an instance of express
const app = express();

//set up socket.io
const server = http.createServer(app);
const io = socket_io(server);

//when a client connects
io.on("connection", (socket) => {
	console.log("New websocket created");

	//Welcome current user
	socket.emit("message", "Welcome to the chat bot");

	//Broadcast when a user connects
	socket.broadcast.emit("message", "a user has joined the chat");

	//When a client disconnects
	socket.on("disconnect", () => {
		io.emit("message", "A user has left the chat");
	});

	// Listens for chat
	socket.on("chatMessage", (msg) => {
		io.emit("message", msg);
	});
});

//middleware
app.use(express.static(path.join(__dirname, "public"))); // renders static files

//create server
const Port = process.env.PORT || 3000;
server.listen(Port, () => {
	console.log(`Server is live on port ${Port}`);
});
