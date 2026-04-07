import { useState } from "react";
import io from "socket.io-client";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import PrivateChatWindow from "./components/PrivateChatWindow";

const socket =
  io("http://localhost:5000");

function App() {

  const [currentRoom,
    setCurrentRoom] =
    useState("general");

  const [privateUser,
    setPrivateUser] =
    useState(null);

  return (

    <div className="app-layout">

      <Sidebar
        socket={socket}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        setPrivateUser={setPrivateUser}
      />

      {privateUser ? (

        <PrivateChatWindow
          socket={socket}
          privateUser={privateUser}
        />

      ) : (

        <ChatWindow
          socket={socket}
          currentRoom={currentRoom}
        />

      )}

    </div>

  );

}

export default App;