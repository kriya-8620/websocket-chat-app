import RoomSelector from "./RoomSelector";
import UsersList from "./UsersList";
import ThemeToggle from "./ThemeToggle";

function Sidebar({
  socket,
  currentRoom,
  setCurrentRoom,
  setPrivateUser
}) {

  return (

    <div className="sidebar">

      <h2>💬 Chat</h2>

      <RoomSelector
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
      />

      <UsersList
        socket={socket}
        setPrivateUser={setPrivateUser}
      />

      <ThemeToggle />

    </div>

  );

}

export default Sidebar;