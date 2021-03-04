import React from "react";
import "./Input.css";
export default function Input(props) {
	const { message, setMessage, sendMessage } = props;
	return (
		<div className="chat-input">
			<input
				className="input"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
			/>
			<button className="text-button" onClick={sendMessage}>
				Send
			</button>
		</div>
	);
}
