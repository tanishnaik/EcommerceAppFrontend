
import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import SpinWheelDiscount from "../components/SpinWheelDiscount";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({ name: "", address: "", payment: "" });
  const [error, setError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [spun, setSpun] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.payment) {
      setError("All fields are required.");
      return;
    }
    clearCart();
    navigate("/order-confirmation", { state: { form, cart, discount } });
  };

  const container = {
    maxWidth: 480,
    margin: '40px auto',
    padding: '32px 20px',
    background: '#fff',
    borderRadius: 18,
    boxShadow: '0 4px 24px rgba(37,99,235,0.08)',
  };
  const title = {
    fontSize: 28,
    fontWeight: 700,
    color: '#1e40af',
    marginBottom: 32,
    textAlign: 'center',
  };
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    background: '#f0f6ff',
    borderRadius: 14,
    padding: 28,
    boxShadow: '0 2px 12px rgba(37,99,235,0.06)',
  };
  const input = {
    background: '#fff',
    padding: '14px 18px',
    borderRadius: 8,
    border: '1px solid #bfdbfe',
    fontSize: 16,
    outline: 'none',
  };
  const select = {
    background: '#fff',
    padding: '14px 18px',
    borderRadius: 8,
    border: '1px solid #bfdbfe',
    fontSize: 16,
    outline: 'none',
  };
  const errorStyle = {
    color: '#ef4444',
    fontWeight: 500,
    textAlign: 'center',
  };
  const btn = {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '14px 0',
    fontWeight: 700,
    fontSize: 16,
    boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
    cursor: 'pointer',
    marginTop: 8,
    transition: 'background 0.2s',
  };

  return (
    <div style={container}>
      <h2 style={title}>Checkout</h2>
      {/* Spin Wheel Discount */}
      <div style={{ marginBottom: 24 }}>
        <SpinWheelDiscount onResult={val => { setDiscount(val); setSpun(true); }} />
        {spun && discount > 0 && (
          <div style={{ color: '#22c55e', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
            Discount Applied: {discount}% OFF
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" style={input} />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" style={input} />
        <select name="payment" value={form.payment} onChange={handleChange} style={select}>
          <option value="">Select Payment Method</option>
          <option value="cod">Cash on Delivery</option>
          <option value="card">Credit/Debit Card</option>
        </select>
        {error && <div style={errorStyle}>{error}</div>}
        <button type="submit" style={btn}>Place Order</button>
      </form>
    </div>
  );
}
