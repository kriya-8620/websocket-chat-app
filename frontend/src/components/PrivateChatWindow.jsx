import { useEffect, useState } from "react";
import Message from "./Message";

function PrivateChatWindow({
  socket,
  privateUser
}) {

  const [messages,
    setMessages] =
    useState([]);

  const [text,
    setText] =
    useState("");

  const username =
    localStorage.getItem(
      "username"
    );

  useEffect(() => {

    socket.on(
      "privateMessage",
      (msg) => {

        if (
          msg.sender === privateUser ||
          msg.receiver === privateUser
        ) {

          setMessages(prev => [

            ...prev,
            msg

          ]);

        }

      }
    );

    return () => {

      socket.off("privateMessage");

    };

  }, [privateUser]);

  const sendPrivateMessage =
    () => {

      socket.emit(
        "privateMessage",
        {

          sender: username,
          receiver: privateUser,
          text

        }
      );

      setText("");

    };

  return (

    <div className="chat-window">

      <h3>
        DM with {privateUser}
      </h3>

      <div className="messages">

        {messages.map(
          (msg, i) => (

            <Message
              key={i}
              msg={msg}
              currentUser={username}
            />

        ))}

      </div>

      <div className="chat-input">

        <input
          value={text}
          placeholder="Send private message..."
          onChange={(e) =>
            setText(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            sendPrivateMessage()
          }
        />

        <button
          onClick={
            sendPrivateMessage
          }
        >
          Send
        </button>

      </div>

    </div>

  );

}

export default PrivateChatWindow;