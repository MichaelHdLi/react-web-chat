import React, { useEffect, useRef } from "react";
import Message from "./Message/Message";
import "./Messages.css";
export default function Messages(props) {
	const { messages, name } = props;
	const scrollRef = useRef();
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);
	return (
		<div className="messages">
			{messages.map((message, index) => {
				return (
					<div className="msg-box" key={index}>
						<Message message={message} name={name} />
					</div>
				);
			})}
			<div ref={scrollRef}></div>
		</div>
	);
}
