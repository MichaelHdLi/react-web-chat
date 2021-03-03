import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
export default function Login() {
	const [name, setName] = useState("");
	const [chatName, setChatName] = useState("");
	const handleNameChange = (e) => {
		const newName = e.target.value;
		setName(newName);
	};
	const handleChatNameChange = (e) => {
		const newChatName = e.target.value;
		setChatName(newChatName);
	};
	const onLinkCLick = (e) => {
		if (!name || !chatName) {
			e.preventDefault();
		}
	};
	return (
		<div className="login-container">
			<h1>Join The Chat Room</h1>
			<div>
				<input
					value={name}
					placeholder="User Name"
					type="text"
					onChange={handleNameChange}
				/>
			</div>
			<div>
				<input
					value={chatName}
					placeholder="Chat Room Name"
					type="text"
					onChange={handleChatNameChange}
				/>
			</div>
			<Link to={`/chat/${name}/${chatName}`} onClick={onLinkCLick}>
				<button>Sign In</button>
			</Link>
		</div>
	);
}
