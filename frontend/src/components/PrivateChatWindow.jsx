import {
  useEffect,
  useState,
  useRef
} from "react";

import axios from "axios";
import Message from "./Message";
import EmojiPicker from "./EmojiPicker";
import FileUpload from "./FileUpload";

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

  const bottomRef =
    useRef(null);

  const username =
    localStorage.getItem(
      "username"
    );

  /* ========================= */
  /* LOAD PRIVATE HISTORY */
  /* ========================= */

  useEffect(() => {

    if (!privateUser) return;

    loadPrivateMessages();

  }, [privateUser]);

  const loadPrivateMessages =
    async () => {

      try {

        const res =
          await axios.get(
`http://localhost:5000/api/messages/private/${username}/${privateUser}`
          );

        setMessages(res.data);

      } catch (err) {

        console.error(
          "Private load error:",
          err
        );

      }

    };

  /* ========================= */
  /* RECEIVE PRIVATE MESSAGE */
  /* ========================= */

  useEffect(() => {

    if (!socket) return;

    const handlePrivate =
      (msg) => {

        if (

          (msg.sender === username &&
           msg.receiver === privateUser)

          ||

          (msg.sender === privateUser &&
           msg.receiver === username)

        ) {

          setMessages(prev => [

            ...prev,
            msg

          ]);

        }

      };

    socket.on(
      "privateMessage",
      handlePrivate
    );

    return () => {

      socket.off(
        "privateMessage",
        handlePrivate
      );

    };

  }, [socket, privateUser]);

  /* ========================= */
  /* MARK AS SEEN */
  /* ========================= */

  useEffect(() => {

    if (!socket) return;

    messages.forEach(msg => {

      if (

        msg.receiver === username &&
        msg.status !== "seen"

      ) {

        socket.emit(
          "seenMessage",
          msg._id
        );

      }

    });

  }, [messages]);

  /* ========================= */
  /* RECEIVE SEEN UPDATE */
  /* ========================= */

  useEffect(() => {

    if (!socket) return;

    const handleSeen =
      (updatedMsg) => {

        setMessages(prev =>

          prev.map(msg =>

            msg._id ===
            updatedMsg._id

              ? updatedMsg
              : msg

          )

        );

      };

    socket.on(
      "messageSeen",
      handleSeen
    );

    return () => {

      socket.off(
        "messageSeen",
        handleSeen
      );

    };

  }, [socket]);

  /* ========================= */
  /* AUTO SCROLL */
  /* ========================= */

  useEffect(() => {

    bottomRef.current
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }, [messages]);

  /* ========================= */
  /* SEND MESSAGE */
  /* ========================= */

  const sendMessage = () => {

    if (!text.trim())
      return;

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

  /* ========================= */
  /* UI */
  /* ========================= */

  return (

    <div className="chat-window">

      <h3>

        DM with {privateUser}

      </h3>

      <div className="messages">

        {messages.map(msg => (

          <Message
            key={msg._id}
            msg={msg}
            currentUser={username}
          />

        ))}

        <div ref={bottomRef} />

      </div>

      <div className="chat-input">

        <EmojiPicker
          setText={setText}
        />

        <FileUpload />

        <input
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

export default PrivateChatWindow;