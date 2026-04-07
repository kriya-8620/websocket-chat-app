import {
  useEffect,
  useState
} from "react";

import io from "socket.io-client";

import Message from "./Message";
import UsersList from "./UsersList";

/* Create socket connection */

const socket =
  io("http://localhost:5000");

function ChatRoom() {

  const [room,
    setRoom] =
    useState("general");

  const [message,
    setMessage] =
    useState("");

  const [messages,
    setMessages] =
    useState([]);

  const [typingUser,
    setTypingUser] =
    useState("");

  const username =
    localStorage
      .getItem("username");

  /* Join room */

  useEffect(() => {

    socket.emit(
      "joinRoom",
      {
        username,
        room
      }
    );

    /* Load old messages */

    socket.on(
      "previousMessages",
      (msgs) => {

        setMessages(msgs);

      }
    );

    /* New message */

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

      socket.off("previousMessages");
      socket.off("message");
      socket.off("typing");

    };

  }, [room]);

  /* Send message */

  const sendMessage = () => {

    if (!message.trim())
      return;

    socket.emit(
      "chatMessage",
      {

        username,
        text: message,
        room

      }
    );

    setMessage("");

  };

  return (

    <div className="chat-layout">

      {/* Sidebar Users */}

      <UsersList socket={socket} />

      {/* Chat Section */}

      <div className="chat-container">

        <h2>
          Room: {room}
        </h2>

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

        </div>

        {/* Typing Indicator */}

        {typingUser && (

          <div className="typing">

            {typingUser} typing...

          </div>

        )}

        {/* Input */}

        <div className="input-area">

          <input

            value={message}

            placeholder="Type message..."

            onChange={(e) => {

              setMessage(
                e.target.value
              );

              socket.emit(
                "typing",
                {
                  username,
                  room
                }
              );

            }}

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

    </div>

  );

}

export default ChatRoom;