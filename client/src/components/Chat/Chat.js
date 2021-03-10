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

    const url = "https://react-web-chatapps.herokuapp.com/";
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
                            src="https://images.emojiterra.com/twitter/v13.0/512px/274e.png"
                        />
                        <i class="fas fa-times-circle"></i>
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
