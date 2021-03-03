import React from "react";

export default function Users(props) {
	const { users } = props;

	return (
		<div>
			<h2>Users In the Room</h2>
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
