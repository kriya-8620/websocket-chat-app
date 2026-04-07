import { useEffect, useState } from "react";

function UsersList({ socket }) {

  const [users,
    setUsers] =
    useState([]);

  useEffect(() => {

    socket.on(
      "usersList",
      (usersList) => {

        setUsers(usersList);

      }
    );

    return () => {

      socket.off("usersList");

    };

  }, [socket]);

  return (

    <div className="users-list">

      <h3>Online Users</h3>

      {users.map(
        (user, i) => (

          <div key={i}>
            🟢 {user}
          </div>

      ))}

    </div>

  );

}

export default UsersList;