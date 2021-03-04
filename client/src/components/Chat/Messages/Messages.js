import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Messages.css";
export default function Messages(props) {
	const { messages } = props;
	return (
		<ScrollToBottom className="messages">
			{messages.map((message, index) => {
				return (
					<div className="text-box" key={index}>
						<p className="name-display">{message.user}</p>
						<div className="chat-text">
							<p className="message-text">{message.text}</p>
						</div>
					</div>
				);
			})}
		</ScrollToBottom>
	);
}
