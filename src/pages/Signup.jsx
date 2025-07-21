import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const container = {
  maxWidth: 400,
  margin: "60px auto",
  padding: "32px 20px",
  background: "#fff",
  borderRadius: 18,
  boxShadow: "0 4px 24px rgba(37,99,235,0.08)",
};

const title = {
  fontSize: 28,
  fontWeight: 700,
  color: "#1e40af",
  marginBottom: 32,
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
  background: "#f0f6ff",
  borderRadius: 14,
  padding: 28,
  boxShadow: "0 2px 12px rgba(37,99,235,0.06)",
};

const input = {
  background: "#fff",
  padding: "14px 18px",
  borderRadius: 8,
  border: "1px solid #bfdbfe",
  fontSize: 16,
  outline: "none",
};

const btn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "14px 0",
  fontWeight: 700,
  fontSize: 16,
  boxShadow: "0 2px 8px rgba(37,99,235,0.10)",
  cursor: "pointer",
  marginTop: 8,
  transition: "background 0.2s",
};

const errorStyle = {
  color: "#ef4444",
  fontWeight: 500,
  textAlign: "center",
};

const successStyle = {
  color: "#22c55e",
  fontWeight: 600,
  textAlign: "center",
  marginTop: 8,
};

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, confirm } = form;

    if (!name || !email || !password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      setError("Email already registered");
      return;
    }

    const user = { name, email, password };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    setSuccess("Registration successful! Redirecting to login...");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div style={container}>
      <h2 style={title}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          style={input}
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          style={input}
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          style={input}
        />
        <input
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          placeholder="Confirm Password"
          style={input}
        />
        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}
        <button type="submit" style={btn}>
          Sign Up
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        Already have an account?{" "}
        <span
          style={{
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
    </div>
  );
}
