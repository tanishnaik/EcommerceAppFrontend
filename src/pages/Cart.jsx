import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

const container = {
  maxWidth: 900,
  margin: '40px auto',
  padding: '32px 16px',
  background: '#fff',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(37,99,235,0.08)',
};
const title = {
  fontSize: 28,
  fontWeight: 700,
  color: '#1e40af',
  marginBottom: 32,
};
const table = {
  width: '100%',
  marginBottom: 32,
  borderCollapse: 'collapse',
};
const th = {
  textAlign: 'left',
  color: '#2563eb',
  fontWeight: 700,
  padding: '12px 8px',
  fontSize: 16,
  borderBottom: '2px solid #e0e7ff',
};
const td = {
  padding: '16px 8px',
  fontSize: 15,
  borderBottom: '1px solid #e5e7eb',
  verticalAlign: 'middle',
};
const img = {
  height: 64,
  width: 64,
  objectFit: 'cover',
  borderRadius: 10,
  marginRight: 16,
  boxShadow: '0 1px 6px rgba(37,99,235,0.10)',
};
const qtyBtn = {
  padding: '4px 12px',
  fontSize: 18,
  border: 'none',
  background: '#e0e7ff',
  color: '#2563eb',
  borderRadius: 6,
  margin: '0 4px',
  cursor: 'pointer',
  fontWeight: 700,
  transition: 'background 0.2s',
};
const removeBtn = {
  color: '#ef4444',
  background: 'none',
  border: 'none',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 15,
  padding: '4px 10px',
  borderRadius: 6,
  transition: 'background 0.2s',
};
const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 24,
};
const totalText = {
  fontSize: 20,
  fontWeight: 700,
};
const checkoutBtn = {
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '14px 32px',
  fontWeight: 700,
  fontSize: 16,
  boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
  cursor: 'pointer',
  transition: 'background 0.2s',
};
const empty = {
  color: '#2563eb',
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 500,
  margin: '40px 0',
};

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountedTotal = Math.max(0, total - discount);

  const handleRemove = (id) => {
    removeFromCart(id);
    showToast("Removed from cart", "info");
  };
  const handleQty = (id, qty) => {
    updateQty(id, qty);
    showToast("Quantity updated", "info");
  };
  const handleCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(10 * cart.length);
      showToast("Coupon applied! ₹10 off per item", "success");
    } else if (coupon) {
      setDiscount(0);
      showToast("Invalid coupon code", "error");
    }
  };
  const handleCheckout = () => {
    showToast("Proceeding to payment", "success");
    navigate("/payment");
  };

  return (
    <div style={container}>
      <h2 style={title}>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div style={empty}>Your cart is empty.</div>
      ) : (
        <>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Product</th>
                <th style={th}>Price</th>
                <th style={th}>Qty</th>
                <th style={th}>Total</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td style={td}>
                    <div style={{display:'flex',alignItems:'center'}}>
                      <img src={item.image} alt={item.name} style={img} />
                      {item.name}
                    </div>
                  </td>
                  <td style={td}>₹{item.price}</td>
                  <td style={td}>
                    <button onClick={() => handleQty(item.id, item.qty - 1)} style={qtyBtn}>-</button>
                    {item.qty}
                    <button onClick={() => handleQty(item.id, item.qty + 1)} style={qtyBtn}>+</button>
                  </td>
                  <td style={td}>₹{item.price * item.qty}</td>
                  <td style={td}>
                    <button onClick={() => handleRemove(item.id)} style={removeBtn}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Coupon UI */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <input
              type="text"
              placeholder="Coupon code"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              style={{
                border: '1px solid #bfdbfe',
                borderRadius: 8,
                padding: '10px 16px',
                fontSize: 16,
                minWidth: 180,
              }}
            />
            <button onClick={handleCoupon} style={{ ...checkoutBtn, padding: '10px 18px', fontSize: 15 }}>Apply</button>
            {discount > 0 && <span style={{ color: '#22c55e', fontWeight: 600 }}>-₹{discount} discount</span>}
          </div>
          <div style={totalRow}>
            <span style={totalText}>Total: <span style={discount > 0 ? {textDecoration:'line-through',color:'#ef4444'} : {}}>₹{total}</span> {discount > 0 && <span style={{color:'#22c55e'}}>₹{discountedTotal}</span>}</span>
            <button onClick={handleCheckout}
              style={checkoutBtn}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
