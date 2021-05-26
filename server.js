//import modules
const express = require("express");
const http = require("http");
const path = require("path");
const socket_io = require("socket.io");
const formatMessage = require("./utilis/message.js");
const {
	userJoin,
	getCurrentUser,
	userLeft,
	getRoomUsers
} = require("./utilis/users.js");

//create an instance of express
const app = express();

//set up socket.io
const server = http.createServer(app);
const io = socket_io(server);

const botName = "Chat Bot";

//when a client connects
io.on("connection", (socket) => {
	socket.on("joinRoom", ({ username, room }) => {
		const user = userJoin(socket.id, username, room);

		socket.join(user.room);

		//Welcomes current user
		socket.emit("message", formatMessage(botName,  `Welcome to the ${user.room} room`));

		//Broadcast when a user connects
		
		socket.broadcast //broadcasts to all users except the user emitting the message. 
			.to(user.room)
			.emit(
				"message",
				formatMessage(botName, `${user.username} has joined the chat`),
			);
		//Send user and room info
		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});

	// Listens for chat
	socket.on("chatMessage", (msg) => {
		const user = getCurrentUser(socket.id);

		io.to(user.room).emit("message", formatMessage(user.username, msg));
	});

	//When a client disconnects
	socket.on("disconnect", () => {
		const user = userLeft(socket.id);

		if (user) {
			io.to(user.room).emit(
				"message",
				formatMessage(botName, `${user.username} has left the chat`),
			);

            //send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
		}
	});
});

//middleware
app.use(express.static(path.join(__dirname, "public"))); // renders static files

//create server
const Port = process.env.PORT || 3000;
server.listen(Port, () => {
	console.log(`Server is live on port ${Port}`);
});
