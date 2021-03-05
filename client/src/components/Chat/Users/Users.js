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
            return (
              <div key={user.id} className='user'>
                <img
                  src="https://miro.medium.com/max/1024/1*nZ9VwHTLxAfNCuCjYAkajg.png"
                  alt="online"
				  className='dot'
                />
                <p>{user.name}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
