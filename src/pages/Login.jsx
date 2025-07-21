import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const container = {
  maxWidth: 400,
  margin: "60px auto",
  padding: 32,
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 2px 16px rgba(37,99,235,0.10)",
  display: "flex",
  flexDirection: "column",
  gap: 18,
};
const title = {
  fontSize: 28,
  fontWeight: 800,
  color: "#2563eb",
  marginBottom: 18,
  textAlign: "center",
};
const input = {
  border: "1.5px solid #2563eb",
  borderRadius: 8,
  padding: "12px 16px",
  fontSize: 16,
  marginBottom: 10,
};
const btn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "12px 0",
  fontWeight: 700,
  fontSize: 17,
  cursor: "pointer",
  marginTop: 8,
  transition: "background 0.2s",
};
const errorStyle = {
  color: "#ef4444",
  fontWeight: 600,
  marginBottom: 8,
  textAlign: "center",
};


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      setError("Invalid email or password");
      return;
    }
    login(user); // AuthContext will handle localStorage and state
    navigate("/");
  };

  return (
    <div style={container}>
      <div style={title}>Login</div>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          style={input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          style={input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button style={btn} type="submit">Login</button>
      </form>
      <div style={{textAlign:'center',marginTop:10}}>
        Don't have an account? <span style={{color:'#2563eb',cursor:'pointer',fontWeight:600}} onClick={()=>navigate('/signup')}>Sign up</span>
      </div>
    </div>
  );
}
