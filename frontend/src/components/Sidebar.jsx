import RoomSelector from "./RoomSelector";
import UsersList from "./UsersList";
import ThemeToggle from "./ThemeToggle";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar({
  socket,
  currentRoom,
  setCurrentRoom,
  setPrivateUser
}) {

  const { setUser } =
    useContext(AuthContext);

  /* Get Logged User */

  const username =
    localStorage.getItem("username");

  /* Logout */

  const logout = () => {

    console.log("Logout clicked");

    /* Disconnect socket */

    if (socket) {
      socket.disconnect();
    }

    /* Clear storage */

    localStorage.clear();

    /* Reset user */

    setUser(null);

  };

  return (

    <div className="sidebar">

      {/* Header */}

      <div className="sidebar-header">

        <h2>💬 Chat</h2>

        {/* Username Display */}

        <div className="current-user">
          👤 {username}
        </div>

      </div>

      {/* Rooms Section */}

      <RoomSelector
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
      />

      {/* Users Section (DM) */}

      <UsersList
        socket={socket}
        setPrivateUser={setPrivateUser}
      />

      {/* Theme Toggle */}

      <ThemeToggle />

      {/* Logout Button */}

      <button
        className="logout-btn"
        onClick={logout}
      >
        🚪 Logout
      </button>

    </div>

  );

}

export default Sidebar;