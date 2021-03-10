import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
export default function Login(props) {
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
    const handleEnter = (e) => {
        if (!name || !chatName) {
            e.preventDefault();
            alert("Please enter a username and a chat room name");
        } else {
            props.history.push(`/chat/${name}/${chatName}`);
        }
    };

    return (
        <div className="login-container">
            <div className="inner-container">
                <h1
                    style={{ textTransform: "uppercase", marginBottom: "10px" }}
                >
                    Welcome
                </h1>
                <input
                    value={name}
                    placeholder="User Name"
                    type="text"
                    onChange={handleNameChange}
                    className="login-input"
                    onKeyPress={(e) =>
                        e.key === "Enter" ? handleEnter(e) : null
                    }
                />

                <input
                    value={chatName}
                    placeholder="Chat Room Name"
                    type="text"
                    onChange={handleChatNameChange}
                    className="login-input"
                    onKeyPress={(e) =>
                        e.key === "Enter" ? handleEnter(e) : null
                    }
                />

                <div className="button-container">
                    <Link
                        to={`/chat/${name}/${chatName}`}
                        onClick={onLinkCLick}
                    >
                        <button className="login-button">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
