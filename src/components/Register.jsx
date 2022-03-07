import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import "./Register.css";
function Register() {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/main");
    }
  }, []);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function signUp() {
    let item = { name, password, email };
    console.warn(item);

    let result = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application:json",
      },
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/main");
  }
  return (
    <div>
      {/* <Header /> */}
      <div className="main-container">
        <div className="img-container"></div>
        <div className="content-container">
          <div className="register-section">
            <h1 className="heading">Register Page</h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form"
              placeholder="name"
            />
            <br />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form"
              placeholder="password"
            />
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form"
              placeholder="email"
            />
            <br />
            <button onClick={signUp} className="button">
              Sign up
            </button>
            <p class="OR">Already have an account?</p>
            <a href="./login" class="login">
              Sign in now &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
