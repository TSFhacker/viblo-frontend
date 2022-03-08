import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/main");
    }
  }, []);

  async function login() {
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application:json",
      },
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    if (result.name) navigate("/main");
    else {
      alert("Wrong email or password");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div>
      {/* <Header /> */}
      <div className="main-container">
        <div className="img-container"></div>
        <div className="content-container ">
          <div className="login-section">
            <h1 class="heading">Login Page</h1>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="form"
            />
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="form"
            />
            <br />
            <button onClick={login} className="button">
              Login
            </button>
            <p className="OR">Don't have an account?</p>
            <a href="/register" className="register">
              Register now &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
