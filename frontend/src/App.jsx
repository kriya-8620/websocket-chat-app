import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";

import {
  useContext
} from "react";

import {
  AuthContext
} from "./context/AuthContext";

function App() {

  const { user } =
    useContext(
      AuthContext
    );

  return (

    <div>

      {!user
        ? <Login />
        : <ChatRoom />
      }

    </div>

  );

}

export default App;