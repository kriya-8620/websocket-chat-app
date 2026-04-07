import { useState } from "react";
import API from "../api/axios";

function Register({ goToLogin }) {

  const [username,
    setUsername] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleRegister =
    async () => {

      try {

        await API.post(
          "/auth/register",
          {
            username,
            password
          }
        );

        alert(
          "Registered successfully"
        );

        goToLogin();

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
          "Registration failed"
        );

      }

    };

  return (

    <div className="auth-container">

      <h2>Register</h2>

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
        onClick={handleRegister}
      >
        Register
      </button>

      <p>

        Already have account?

        <span
          className="link"
          onClick={goToLogin}
        >
          Login
        </span>

      </p>

    </div>

  );

}

export default Register;