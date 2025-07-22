import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const pageStyle = {
  maxWidth: 1100,
  margin: "40px auto 0 auto",
  padding: 24,
};
const titleStyle = {
  fontSize: 28,
  fontWeight: 800,
  color: "#1e40af",
  marginBottom: 32,
  textAlign: "center",
};
const sectionStyle = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 2px 12px rgba(37,99,235,0.08)",
  padding: 24,
  marginBottom: 32,
};
const input = {
  border: "1px solid #bfdbfe",
  borderRadius: 8,
  padding: "10px 16px",
  fontSize: 16,
  marginRight: 8,
  marginBottom: 8,
};
const btn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 24px",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  marginTop: 8,
  transition: "background 0.2s",
};

export default function Admin() {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem("allProducts") || "[]"));
  const [orders] = useState(() => JSON.parse(localStorage.getItem("orders") || "[]"));
  const [form, setForm] = useState({ name: "", price: "", category: "", image: "", description: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (!form.name || !form.price) return showToast("Name and price required", "error");
    const newProduct = { ...form, id: Date.now(), price: Number(form.price), rating: 5, reviews: 1, stock: 10 };
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem("allProducts", JSON.stringify(updated));
    showToast("Product added!", "success");
    setForm({ name: "", price: "", category: "", image: "", description: "" });
  };
  const handleDelete = id => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem("allProducts", JSON.stringify(updated));
    showToast("Product deleted", "success");
  };

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>Admin Panel</h2>
      <div style={sectionStyle}>
        <h3>Add Product</h3>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" style={input} />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" style={input} type="number" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" style={input} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" style={input} />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" style={input} />
        <button onClick={handleAdd} style={btn}>Add</button>
      </div>
      <div style={sectionStyle}>
        <h3>All Products</h3>
        <ul>
          {products.map(p => (
            <li key={p.id} style={{ marginBottom: 8 }}>
              {p.name} - ₹{p.price}
              <button onClick={() => handleDelete(p.id)} style={{ ...btn, background: '#ef4444', marginLeft: 12 }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div style={sectionStyle}>
        <h3>Orders</h3>
        <ul>
          {orders.length === 0 && <li>No orders yet.</li>}
          {orders.map((o, i) => (
            <li key={i}>Order #{i + 1} - {o.items.length} items - ₹{o.total}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
