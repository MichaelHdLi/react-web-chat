import React from "react";
import "./Message.css";
export default function Message(props) {
	const { message, name } = props;
	let isCurrentUser = false;
	if (message.user === name) {
		isCurrentUser = true;
	}

	return (
		<div>
			<p className={`name-display ${isCurrentUser ? "current-name" : ""}`}>
				{message.user}
			</p>
			<div className={`text-box ${isCurrentUser ? "flex-end" : ""}`}>
				<div className={`chat-text ${isCurrentUser ? "by-current" : ""}`}>
					<p className="message-text">{message.text}</p>
				</div>
			</div>
		</div>
	);
}
