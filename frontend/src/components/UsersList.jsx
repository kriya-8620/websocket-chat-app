import { useEffect, useState } from "react";

function UsersList({
  socket,
  setPrivateUser
}) {

  const [users,
    setUsers] =
    useState([]);

  const currentUser =
    localStorage.getItem(
      "username"
    );

  useEffect(() => {

    if (!socket) return;

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

      {users
        .filter(
          user =>
            user !== currentUser
        )
        .map(user => (

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