import React, { useState } from "react";

const ReturnOrCancelOrder = ({ order, onReturn, onCancel }) => {
  const [action, setAction] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const container = {
    maxWidth: 420,
    margin: "32px auto",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 12px #2563eb11",
    padding: 32,
    textAlign: "center",
  };
  const title = {
    fontSize: 22,
    fontWeight: 800,
    color: "#2563eb",
    marginBottom: 18,
  };
  const select = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1.5px solid #2563eb",
    fontSize: 16,
    marginBottom: 16,
    background: "#f3f4f6",
  };
  const textarea = {
    width: "100%",
    minHeight: 60,
    borderRadius: 10,
    border: "1.5px solid #2563eb",
    padding: "10px 14px",
    fontSize: 15,
    marginBottom: 16,
    background: "#f3f4f6",
    resize: "vertical",
  };
  const btn = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "12px 28px",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 8,
    boxShadow: "0 2px 8px #2563eb22",
    transition: "background 0.2s",
  };
  const errorStyle = {
    color: "#ef4444",
    fontWeight: 600,
    marginBottom: 10,
  };
  const successStyle = {
    color: "#22c55e",
    fontWeight: 700,
    marginTop: 16,
    fontSize: 17,
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!action || !reason.trim()) {
      setError("Please select an action and provide a reason.");
      return;
    }
    setError("");
    setSubmitted(true);
    if (action === "return" && onReturn) onReturn(reason);
    if (action === "cancel" && onCancel) onCancel(reason);
  };

  if (submitted) {
    return (
      <div style={container}>
        <div style={successStyle}>
          {action === "return" ? "Return request submitted!" : "Order cancellation request submitted!"}
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={title}>Return or Cancel Order</div>
      <form onSubmit={handleSubmit}>
        <select value={action} onChange={e => setAction(e.target.value)} style={select}>
          <option value="">Select Action</option>
          <option value="return">Return Product</option>
          <option value="cancel">Cancel Order</option>
        </select>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          style={textarea}
          placeholder="Reason for return or cancellation..."
        />
        {error && <div style={errorStyle}>{error}</div>}
        <button type="submit" style={btn}>Submit</button>
      </form>
    </div>
  );
};

export default ReturnOrCancelOrder;
