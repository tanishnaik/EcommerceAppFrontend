import React from "react";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.25)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const modalStyle = {
  background: "#fff",
  borderRadius: 18,
  boxShadow: "0 4px 32px rgba(37,99,235,0.12)",
  padding: 32,
  minWidth: 340,
  maxWidth: 420,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const closeBtn = {
  position: "absolute",
  top: 16,
  right: 16,
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "6px 12px",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
};
const imgStyle = {
  width: 160,
  height: 160,
  objectFit: "cover",
  borderRadius: 12,
  marginBottom: 18,
  boxShadow: "0 1px 6px rgba(37,99,235,0.10)",
};
const nameStyle = {
  fontSize: 22,
  fontWeight: 700,
  color: "#1e40af",
  marginBottom: 8,
  textAlign: "center",
};
const catStyle = {
  color: "#2563eb",
  marginBottom: 6,
  fontWeight: 500,
  fontSize: 15,
};
const descStyle = {
  color: "#222",
  marginBottom: 12,
  fontSize: 15,
  textAlign: "center",
};
const priceStyle = {
  fontSize: 18,
  fontWeight: 700,
  color: "#1e40af",
  marginBottom: 12,
};
const ratingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginBottom: 8,
  justifyContent: 'center',
};

function renderStars(rating = 0) {
  return Array.from({ length: 5 }).map((_, i) => (
    <span key={i} style={{ color: i < rating ? '#facc15' : '#d1d5db', fontSize: 16 }}>&#9733;</span>
  ));
}

export default function QuickViewModal({ product, onClose }) {
  if (!product) return null;
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <button style={closeBtn} onClick={onClose}>Close</button>
        <img src={product.image} alt={product.name} style={imgStyle} />
        <h3 style={nameStyle}>{product.name}</h3>
        <p style={catStyle}>{product.category}</p>
        <div style={ratingStyle}>
          {renderStars(product.rating)}
          <span style={{ color: '#6b7280', fontSize: 14, marginLeft: 4 }}>({product.reviews || 0})</span>
        </div>
        <p style={descStyle}>{product.description}</p>
        <span style={priceStyle}>₹{product.price}</span>
      </div>
    </div>
  );
}
