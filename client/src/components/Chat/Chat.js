import React, { useState, useEffect } from "react";
import Users from "./Users/Users";
import Messages from "./Messages/Messages";
import io from "socket.io-client";
import "./Chat.css";

let socket;
export default function Chat(props) {
	const [state, setState] = useState({ name: "", chatName: "" });
	const [currentUsers, setCurrentUsers] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

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
		socket.emit("join chat", data, (error) => {
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

	function sendMessage(e) {
		e.preventDefault();
		if (message) {
			socket.emit("send message", message, () => {
				setMessage(""); //clear input after send
			});
		}
	}

	return (
		<div className="container">
			<div className="room-info">Room:{state.chatName}</div>
			<div className="main-container">
				<div className="chat-container">
					<div className="user-online">
						<Users users={currentUsers} />
					</div>
					<div className="chat-box">
						<Messages messages={messages} />

						<div className="input">
							<input
								className="text-input"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
							/>
							<button className="text-button" onClick={sendMessage}>
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
