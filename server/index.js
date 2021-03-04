const app = require("express")();
const http = require("http").createServer(app);
const socketIo = require("socket.io");
const router = require("./router");
const PORT = process.env.PORT || 5000;
const io = socketIo(http);

let users = [];
addUser = (id, name, chatName) => {
	// name = name.trim().toLowerCase();
	// chatName = chatName.trim().toLowerCase();

	const exist = users.find((user) => {
		return user.chatName === chatName && user.name === name;
	});

	if (exist) {
		return { error: "Name is taken" };
	}

	const newUser = { id, name, chatName };
	users = [...users, newUser];
	return { newUser };
};

removeUser = (id) => {
	users = users.filter((user) => user.id !== id);
};

getUser = (id) => users.find((user) => user.id === id);

usersInRoom = (chatName) => users.filter((user) => user.chatName === chatName);

io.on("connect", (socket) => {
	console.log("new connection");

	//recieve data from chat.
	socket.on("join chat", (data, cb) => {
		const { error, newUser } = addUser(socket.id, data.name, data.chatName);
		if (error) return cb(error);
		socket.join(newUser.chatName);
		socket.emit("message", {
			user: "admin",
			text: newUser.name + " welcome to room: " + newUser.chatName,
		});

		socket.broadcast.to(newUser.chatName).emit("message", {
			user: "admin",
			text: newUser.name + " has join the room",
		});
		let currentUsers = usersInRoom(newUser.chatName);
		io.to(newUser.chatName).emit("send_users", currentUsers);

		cb();
	});

	socket.on("send message", (message, cb) => {
		const user = getUser(socket.id);
		io.to(user.chatName).emit("message", {
			user: user.name,
			text: message,
		});
		cb();
	});
	socket.on("disconnect", () => {
		removeUser(socket.id);
	});
});

app.use(router);

http.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
