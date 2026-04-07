import { useState } from "react";
import Login from "./Login";
import Chat from "./Chat";

function App() {

  const [username, setUsername] =
    useState("");

  return (
    <div className="app">

      {!username ? (
        <Login
          setUsername={setUsername}
        />
      ) : (
        <Chat username={username} />
      )}

    </div>
  );
}

export default App;