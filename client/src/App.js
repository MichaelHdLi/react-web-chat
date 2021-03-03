import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

export default function App() {
	return (
		<div>
			<Route path="/" exact component={Login} />
			<Route path="/chat/:name/:chatName" component={Chat} />
		</div>
	);
}
