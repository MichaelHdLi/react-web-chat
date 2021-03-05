import React, { useState, useEffect } from "react";
import Users from "./Users/Users";
import Messages from "./Messages/Messages";
import Input from "./Input/Input";
import io from "socket.io-client";
import "./Chat.css";

let socket;
export default function Chat(props) {
	const [state, setState] = useState({ name: "", chatName: "" });
	const [currentUsers, setCurrentUsers] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	// const url = "https://react-web-chatapps.herokuapp.com/";
	const url = "localhost:5000";
	useEffect(() => {
		const data = props.match.params;
		const connectionOptions = {
			"force new connection": true,
			reconnectionAttempts: "Infinity",
			timeout: 10000,
			transports: ["websocket"],
		};

		socket = io(url, connectionOptions);
		setState(data);
		socket.emit("join_chat", data, (error) => {
			if (error) {
				alert(error);
			}
		});
		return () => {
			socket.disconnect();
			socket.off();
		};
	}, [url, props.match.params]);

	useEffect(() => {
		socket.on("message", (msg) => {
			setMessages((prevMsg) => {
				return [...prevMsg, msg];
			});
		});
		socket.on("send_users", (users) => {
			setCurrentUsers(users);
		});
	}, []);

	function sendMessage(event) {
		event.preventDefault();
		if (message) {
			socket.emit("send_message", message, () => {
				setMessage(""); //clear input after send
			});
		}
	}

	return (
		<div className="main-container">
			<div className="container">
				<div className="room-info">
					Room:{state.chatName}
					<a href="/">
						<img
							className="exit"
							alt="logout"
							src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjcuOTY1IDI3Ljk2NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjcuOTY1IDI3Ljk2NTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9ImMxNDJfeCI+DQoJCTxwYXRoIGQ9Ik0xMy45OCwwQzYuMjU5LDAsMCw2LjI2MSwwLDEzLjk4M2MwLDcuNzIxLDYuMjU5LDEzLjk4MiwxMy45OCwxMy45ODJjNy43MjUsMCwxMy45ODUtNi4yNjIsMTMuOTg1LTEzLjk4Mg0KCQkJQzI3Ljk2NSw2LjI2MSwyMS43MDUsMCwxMy45OCwweiBNMTkuOTkyLDE3Ljc2OWwtMi4yMjcsMi4yMjRjMCwwLTMuNTIzLTMuNzgtMy43ODYtMy43OGMtMC4yNTksMC0zLjc4MywzLjc4LTMuNzgzLDMuNzgNCgkJCWwtMi4yMjgtMi4yMjRjMCwwLDMuNzg0LTMuNDcyLDMuNzg0LTMuNzgxYzAtMC4zMTQtMy43ODQtMy43ODctMy43ODQtMy43ODdsMi4yMjgtMi4yMjljMCwwLDMuNTUzLDMuNzgyLDMuNzgzLDMuNzgyDQoJCQljMC4yMzIsMCwzLjc4Ni0zLjc4MiwzLjc4Ni0zLjc4MmwyLjIyNywyLjIyOWMwLDAtMy43ODUsMy41MjMtMy43ODUsMy43ODdDMTYuMjA3LDE0LjIzOSwxOS45OTIsMTcuNzY5LDE5Ljk5MiwxNy43Njl6Ii8+DQoJPC9nPg0KCTxnIGlkPSJDYXBhXzFfMTA0XyI+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
						/>
					</a>
				</div>
				<div className="chat">
					<Users users={currentUsers} />
					<div className="chat-box">
						<Messages messages={messages} name={state.name} />
						<Input
							message={message}
							setMessage={setMessage}
							sendMessage={sendMessage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
