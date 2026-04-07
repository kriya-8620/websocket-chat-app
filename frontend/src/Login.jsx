import { useState } from "react";

function Login({ setUsername }) {

  const [name, setName] =
    useState("");

  const handleJoin = () => {

    if (!name.trim()) {
      alert("Enter username");
      return;
    }

    setUsername(name);
  };

  return (
    <div className="login-container">

      <h2>
        WebSocket Chat 🚀
      </h2>

      <input
        type="text"
        placeholder="Enter username"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        onKeyDown={(e) =>
          e.key === "Enter" &&
          handleJoin()
        }
      />

      <button onClick={handleJoin}>
        Join Chat
      </button>

    </div>
  );
}

export default Login;