import { useEffect, useState } from "react";

import Message from "./Message";
import EmojiPicker from "./EmojiPicker";
import FileUpload from "./FileUpload";

function ChatWindow({
  socket,
  currentRoom
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

    socket.emit(
      "joinRoom",
      {
        username,
        room: currentRoom
      }
    );

    socket.on(
      "previousMessages",
      (msgs) => {

        setMessages(msgs);

      }
    );

    socket.on(
      "message",
      (msg) => {

        setMessages(prev => [

          ...prev,
          msg

        ]);

      }
    );

    return () => {

      socket.off("message");
      socket.off("previousMessages");

    };

  }, [currentRoom]);

  const sendMessage = () => {

    if (!text.trim())
      return;

    socket.emit(
      "chatMessage",
      {

        username,
        text,
        room: currentRoom

      }
    );

    setText("");

  };

  return (

    <div className="chat-window">

      <h3>
        #{currentRoom}
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

        <EmojiPicker
          setText={setText}
        />

        <FileUpload />

        <input
          type="text"
          value={text}
          placeholder="Type message..."
          onChange={(e) =>
            setText(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            sendMessage()
          }
        />

        <button
          onClick={sendMessage}
        >
          Send
        </button>

      </div>

    </div>

  );

}

/* ⭐ VERY IMPORTANT */

export default ChatWindow;