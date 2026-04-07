import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Register from "./Register";

function Login() {

  const { setUser } =
    useContext(AuthContext);

  const [username,
    setUsername] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [showRegister,
    setShowRegister] =
    useState(false);

  const handleLogin =
    async () => {

      try {

        const res =
          await API.post(
            "/auth/login",
            {
              username,
              password
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "username",
          res.data.username
        );

        setUser(
          res.data.username
        );

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
          "Login failed"
        );

      }

    };

  if (showRegister)
    return (
      <Register
        goToLogin={() =>
          setShowRegister(false)
        }
      />
    );

  return (

    <div className="auth-container">

      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        onClick={handleLogin}
      >
        Login
      </button>

      <p>
        Don't have account?

        <span
          className="link"
          onClick={() =>
            setShowRegister(true)
          }
        >
          Register
        </span>

      </p>

    </div>

  );

}

export default Login;