const app = require("express")();
const http = require("http").createServer(app);
const socketIo = require("socket.io");
const router = require("./router");
const cors = require("cors");
const { userInfo } = require("os");
const PORT = process.env.PORT || 5000;
const io = socketIo(http);
let users = [];
addUser = (id, name, chatName) => {
	chatName = chatName.trim().toLowerCase();

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
	if (users) {
		return users[0];
	}
};

getUser = (id) => users.find((user) => user.id === id);

usersInRoom = (chatName) => users.filter((user) => user.chatName === chatName);

io.on("connect", (socket) => {
	console.log("new connection");

	//recieve data from chat.
	socket.on("join_chat", (data, cb) => {
		const { error, newUser } = addUser(socket.id, data.name, data.chatName);
		if (error) return cb(error);
		socket.join(newUser.chatName);
		socket.emit("message", {
			user: "Admin",
			text: "Welcome to the room " + newUser.name,
		});

		socket.broadcast.to(newUser.chatName).emit("message", {
			user: "Admin",
			text: newUser.name + " has join the room",
		});
		let currentUsers = usersInRoom(newUser.chatName);
		io.to(newUser.chatName).emit("send_users", currentUsers);

		cb();
	});

	socket.on("send_message", (message, cb) => {
		const user = getUser(socket.id);
		io.to(user.chatName).emit("message", {
			user: user.name,
			text: message,
		});
		cb();
	});
	socket.on("disconnect", () => {
		const user = removeUser(socket.id);
		if (user) {
			io.to(user.chatName).emit("send_users", usersInRoom(user.chatName));
		}
	});
});

app.use(router);
app.use(cors());

http.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
