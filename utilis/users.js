//this module handles the entire users of this application.
const users = [];

//Join user to the chat
function userJoin(id, username, room) {
	const user = { id, username, room };
	// console.log(user.id);
	users.push(user);

	return user;
}


//Get the current user

function getCurrentUser(id) {
	return users.find((user) => user.id === id);
}

//user leaves the chat
function userLeft(id) {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

//get room users
function getRoomUsers(room) {
	return users.filter((user) => user.room === room);
}

module.exports = {
	userJoin,
	getCurrentUser,
	userLeft,
	getRoomUsers
};
