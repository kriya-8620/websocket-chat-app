import { useEffect, useState, useRef } from "react";

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

  const [typingUser,
    setTypingUser] =
    useState("");

  const bottomRef =
    useRef(null);

  const username =
    localStorage.getItem(
      "username"
    );

  /* Join Room */

  useEffect(() => {

    socket.emit(
      "joinRoom",
      {
        username,
        room: currentRoom
      }
    );

    /* Load old messages */

    socket.on(
      "previousMessages",
      (msgs) => {

        setMessages(msgs);

      }
    );

    /* Receive new message */

    socket.on(
      "message",
      (msg) => {

        setMessages(prev => [

          ...prev,
          msg

        ]);

      }
    );

    /* Typing indicator */

    socket.on(
      "typing",
      (user) => {

        setTypingUser(user);

        setTimeout(() => {

          setTypingUser("");

        }, 2000);

      }
    );

    /* Cleanup */

    return () => {

      socket.off("message");
      socket.off("previousMessages");
      socket.off("typing");

    };

  }, [currentRoom]);

  /* Auto Scroll */

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  /* Send Message */

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

  /* Handle Typing */

  const handleTyping = (e) => {

    setText(e.target.value);

    socket.emit(
      "typing",
      {
        username,
        room: currentRoom
      }
    );

  };

  return (

    <div className="chat-window">

      {/* Room Title */}

      <h3>
        #{currentRoom}
      </h3>

      {/* Messages */}

      <div className="messages">

        {messages.map(
          (msg, i) => (

            <Message
              key={i}
              msg={msg}
              currentUser={username}
            />

        ))}

        {/* Typing Indicator */}

        {typingUser && (

          <div className="typing">

            {typingUser} typing...

          </div>

        )}

        {/* Auto-scroll anchor */}

        <div ref={bottomRef} />

      </div>

      {/* Input Area */}

      <div className="chat-input">

        {/* Emoji */}

        <EmojiPicker
          setText={setText}
        />

        {/* File Upload */}

        <FileUpload />

        {/* Input */}

        <input
          type="text"
          value={text}
          placeholder="Type message..."
          onChange={handleTyping}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            sendMessage()
          }
        />

        {/* Send Button */}

        <button
          onClick={sendMessage}
        >
          Send
        </button>

      </div>

    </div>

  );

}

export default ChatWindow;