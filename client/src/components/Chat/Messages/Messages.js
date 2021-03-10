import React from "react";
import Message from "./Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Messages.css";
export default function Messages(props) {
    const { messages, name } = props;

    return (
        <ScrollToBottom className="messages">
            {messages.map((message, index) => {
                return (
                    <div className="msg-box" key={index}>
                        <Message message={message} name={name} />
                    </div>
                );
            })}
        </ScrollToBottom>
    );
}
