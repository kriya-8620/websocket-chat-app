import { useEffect, useState } from "react";

function UsersList({
  socket,
  setPrivateUser
}) {

  const [users,
    setUsers] =
    useState([]);

  useEffect(() => {

    socket.on(
      "usersList",
      (list) => {

        setUsers(list);

      }
    );

    return () => {

      socket.off("usersList");

    };

  }, [socket]);

  return (

    <div className="users-list">

      <h4>Users</h4>

      {users.map(user => (

        <div
          key={user}
          className="user"
          onClick={() =>
            setPrivateUser(user)
          }
        >

          🟢 {user}

        </div>

      ))}

    </div>

  );

}

export default UsersList;