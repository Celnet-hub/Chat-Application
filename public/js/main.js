const socket = io();
const chatForm = document.getElementById("chat-form");

// Message from server
socket.on("message", (message) => {
	console.log(message);
});

// Message submit
chatForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const msg = e.target.elements.msg.value;

	//Emit a message to server
	socket.emit("chatMessage", msg);
});


//Output message to DOM


