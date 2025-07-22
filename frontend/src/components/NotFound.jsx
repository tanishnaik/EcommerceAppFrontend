import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      color: "#2563eb"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px #2563eb22",
        padding: "48px 32px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 12 }}>404</div>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 18 }}>Page Not Found</div>
        <div style={{ fontSize: 16, color: "#64748b", marginBottom: 32 }}>
          Sorry, the page you are looking for does not exist.
        </div>
        <Link to="/" style={{
          background: "#2563eb",
          color: "#fff",
          padding: "12px 28px",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 16,
          textDecoration: "none",
          boxShadow: "0 1px 4px #2563eb33"
        }}>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
