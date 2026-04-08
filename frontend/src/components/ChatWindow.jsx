import {
  useEffect,
  useState,
  useRef
} from "react";

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

  /* --------------------------- */
  /* JOIN ROOM */
  /* --------------------------- */

  useEffect(() => {

    if (!socket) return;

    /* Clear messages on room switch */

    setMessages([]);

    socket.emit(
      "joinRoom",
      {
        username,
        room: currentRoom
      }
    );

  }, [currentRoom, socket]);

  /* --------------------------- */
  /* SOCKET LISTENERS */
  /* --------------------------- */

  useEffect(() => {

    if (!socket) return;

    /* Load old messages */

    const handlePrevious =
      (msgs) => {

        setMessages(msgs);

      };

    /* Receive new message */

    const handleMessage =
      (msg) => {

        setMessages(prev => [

          ...prev,
          msg

        ]);

      };

    /* Typing indicator */

    const handleTyping =
      (user) => {

        setTypingUser(user);

        setTimeout(() => {

          setTypingUser("");

        }, 2000);

      };

    socket.on(
      "previousMessages",
      handlePrevious
    );

    socket.on(
      "message",
      handleMessage
    );

    socket.on(
      "typing",
      handleTyping
    );

    /* Cleanup */

    return () => {

      socket.off(
        "previousMessages",
        handlePrevious
      );

      socket.off(
        "message",
        handleMessage
      );

      socket.off(
        "typing",
        handleTyping
      );

    };

  }, [socket]);

  /* --------------------------- */
  /* AUTO SCROLL */
  /* --------------------------- */

  useEffect(() => {

    bottomRef.current
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }, [messages]);

  /* --------------------------- */
  /* SEND MESSAGE */
  /* --------------------------- */

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

  /* --------------------------- */
  /* HANDLE TYPING */
  /* --------------------------- */

  const handleTyping =
    (e) => {

      setText(
        e.target.value
      );

      socket.emit(
        "typing",
        {
          username,
          room: currentRoom
        }
      );

    };

  /* --------------------------- */
  /* UI */
  /* --------------------------- */

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
            key={msg._id || i}
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

        <div ref={bottomRef} />

      </div>

      {/* Input */}

      <div className="chat-input">

        <EmojiPicker
          setText={setText}
        />

        <FileUpload />

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