import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Login.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("1");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("token/", { username: email, password });
      localStorage.setItem("token", response.data.access);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("register/", {
        username,
        email,
        password,
        organization: parseInt(organization),
      });
      alert("Account created successfully! Please log in.");
      setIsSignup(false);
      setEmail(username); // autofill login email
    } catch  {
      setError("Signup failed. Try another email or username.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">{isSignup ? "Sign Up" : "Log In"}</h1>
        <form onSubmit={isSignup ? handleSignup : handleLogin} className="login-form">
          {isSignup && (
            <>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                placeholder="samiya123"
              />
            </>
          )}
          <label>User Name</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            placeholder="samiya@company.com"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="••••••••"
          />
          {isSignup && (
            <>
              <label>Organization</label>
              <select
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="login-input"
              >
                <option value="4">Org 1</option>
                <option value="5">Org 2</option>
                <option value="6">Org 3</option>
              </select>
            </>
          )}
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className="login-footer">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            style={{ textDecoration: "underline", cursor: "pointer", color: "#9f7aea" }}
          >
            {isSignup ? "Log in" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}
