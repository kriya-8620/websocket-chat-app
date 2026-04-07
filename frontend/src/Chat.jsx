import { useEffect, useState, useRef } from "react";
import Message from "./Message";

function Chat({ username }) {

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {

    const ws = new WebSocket(
      "ws://localhost:5000"
    );

    socketRef.current = ws;

    ws.onopen = () => {

      ws.send(
        JSON.stringify({
          type: "join",
          username
        })
      );
    };

    ws.onmessage = (event) => {

      const message =
        JSON.parse(event.data);

      setMessages((prev) => [
        ...prev,
        message
      ]);
    };

    ws.onclose = () => {
      console.log(
        "Disconnected from server"
      );
    };

    return () => ws.close();

  }, [username]);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  const sendMessage = () => {

    if (!text.trim()) return;

    socketRef.current.send(
      JSON.stringify({
        type: "chat",
        text
      })
    );

    setText("");
  };

  return (

    <div className="chat-container">

      <div className="chat-header">

        <h3>
          Welcome, {username}
        </h3>

      </div>

      <div className="messages">

        {messages.map((msg, index) => (

          <Message
            key={index}
            message={msg}
            currentUser={username}
          />

        ))}

        <div ref={messagesEndRef} />

      </div>

      <div className="input-area">

        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            sendMessage()
          }
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default Chat;