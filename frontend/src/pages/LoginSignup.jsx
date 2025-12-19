import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import api from "../api";   // ✅ IMPORTANT

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 🔹 Handle input change
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 LOGIN FUNCTION (BACKEND CALL)
  const login = async () => {
    try {
      const res = await api.post("/login", formData);

      if (res.data.success) {
        localStorage.setItem("auth-token", res.data.token);
        window.location.replace("/");
      } else {
        alert(res.data.errors);
      }
    } catch (error) {
      console.log("Login error:", error);
      alert("Login failed");
    }
  };

  // 🔹 SIGNUP FUNCTION (BACKEND CALL)
  const signup = async () => {
    try {
      const res = await api.post("/signup", formData);

      if (res.data.success) {
        localStorage.setItem("auth-token", res.data.token);
        window.location.replace("/");
      } else {
        alert(res.data.errors);
      }
    } catch (error) {
      console.log("Signup error:", error);
      alert("Signup failed");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          )}

          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />

          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>

        <button onClick={state === "Login" ? login : signup}>
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span onClick={() => setState("Login")}> Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?
            <span onClick={() => setState("Sign Up")}> Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>
            By continuing, I agree to the terms of use & privacy policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
