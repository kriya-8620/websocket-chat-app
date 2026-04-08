import { useContext, useState } from "react";
import io from "socket.io-client";

import Login from "./components/Login";
import Register from "./components/Register";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import PrivateChatWindow from "./components/PrivateChatWindow";

import { AuthContext } from "./context/AuthContext";

const socket =
  io("http://localhost:5000");

function App() {

  const { user } =
    useContext(AuthContext);

  const [currentRoom,
    setCurrentRoom] =
    useState("general");

  const [privateUser,
    setPrivateUser] =
    useState(null);

  const [showRegister,
    setShowRegister] =
    useState(false);

  /* 🔐 If NOT logged in */

  if (!user) {

    return showRegister ? (

      <Register
        goToLogin={() =>
          setShowRegister(false)
        }
      />

    ) : (

      <Login
        goToRegister={() =>
          setShowRegister(true)
        }
      />

    );

  }

  /* 💬 If logged in */

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