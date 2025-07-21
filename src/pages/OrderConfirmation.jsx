import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { form } = location.state || {};

  if (!form) {
    return (
      <div style={{maxWidth: 520, margin: '80px auto', padding: 32, textAlign: 'center'}}>
        <h2 style={{fontSize: 28, fontWeight: 800, color: '#2563eb', marginBottom: 18}}>No order found.</h2>
        <button
          onClick={() => navigate("/")}
          style={{color: '#2563eb', textDecoration: 'underline', fontWeight: 700, fontSize: 17, background: 'none', border: 'none', cursor: 'pointer'}}
        >Go Home</button>
      </div>
    );
  }

  return (
    <div style={{maxWidth: 480, margin: '80px auto', padding: '32px 16px', textAlign: 'center'}}>
      <div style={{fontSize: 38, marginBottom: 18}}>🎉</div>
      <h2 style={{fontSize: 32, fontWeight: 900, color: '#22c55e', marginBottom: 18, letterSpacing: -1}}>Order Placed Successfully!</h2>
      <div style={{background: '#fff', borderRadius: 22, boxShadow: '0 4px 32px rgba(37,99,235,0.10)', padding: 32, marginBottom: 32, display: 'inline-block', minWidth: 320}}>
        <div style={{fontSize: 18, marginBottom: 8}}>Thank you, <span style={{fontWeight: 700, color: '#2563eb'}}>{form.name}</span>!</div>
        <div style={{fontSize: 16, color: '#555', marginBottom: 8}}>Your order will be delivered to:</div>
        <div style={{fontWeight: 600, color: '#18181b', marginBottom: 8}}>{form.address}</div>
        <div style={{fontSize: 16, color: '#555', marginBottom: 8}}>Payment Method: <span style={{textTransform: 'capitalize', color: '#2563eb', fontWeight: 600}}>{form.payment}</span></div>
      </div>
      <button
        onClick={() => navigate("/")}
        style={{background: '#2563eb', color: '#fff', padding: '14px 38px', borderRadius: 12, fontWeight: 800, fontSize: 18, boxShadow: '0 2px 8px rgba(37,99,235,0.10)', border: 'none', cursor: 'pointer', transition: 'background 0.2s'}}
      >Back to Home</button>
    </div>
  );
}
