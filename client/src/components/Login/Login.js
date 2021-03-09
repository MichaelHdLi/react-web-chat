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
			<div className="inner-container">
				<h1>Welcome</h1>
				<input
					value={name}
					placeholder="User Name"
					type="text"
					onChange={handleNameChange}
					className="login-input"
				/>

				<input
					value={chatName}
					placeholder="Chat Room Name"
					type="text"
					onChange={handleChatNameChange}
					className="login-input"
				/>

				<div className="button-container">
					<Link to={`/chat/${name}/${chatName}`} onClick={onLinkCLick}>
						<button className="login-button">Login</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
