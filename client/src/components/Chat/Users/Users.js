import React from "react";
import "./Users.css";
export default function Users(props) {
	const { users } = props;

	return (
		<div className="users">
			<h2>Currently Online</h2>
			{users ? (
				<div>
					{users.map((user) => {
						return <p key={user.id}>{user.name}</p>;
					})}
				</div>
			) : null}
		</div>
	);
}
