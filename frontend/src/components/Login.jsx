import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login({ goToRegister }) {

  const { setUser } =
    useContext(AuthContext);

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      const res =
        await API.post(
          "/auth/login",
          { username, password }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "username",
        res.data.username
      );

      setUser(res.data.username);

    } catch {

      alert("Login failed");

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2>💬 Welcome Back</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have account?

          <span
            className="link"
            onClick={goToRegister}
          >
            Register
          </span>

        </p>

      </div>

    </div>

  );

}

export default Login;