import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ProductCard from "./ProductCard";
import { mockProducts } from "./HomePage";

export default function ProductChatbot() {
  const { dark } = useContext(ThemeContext);
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

  // AI search logic
  function getRecommendations() {
    let filtered = mockProducts;
    if (category) filtered = filtered.filter(p => p.category === category);
    if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
    if (search.trim()) {
      const searchText = search.trim().toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchText) ||
        p.description?.toLowerCase().includes(searchText) ||
        p.category.toLowerCase().includes(searchText)
      );
    }
    filtered = filtered.sort((a, b) => b.rating - a.rating);
    return filtered.slice(0, 3);
  }

  function handleRecommend() {
    const recs = getRecommendations();
    setRecommendations(recs);
    setStep(3);
    if (recs.length === 0) {
      setNotification({ type: 'error', message: 'No products found matching your preferences.' });
      setTimeout(() => setNotification(null), 4000);
    }
  }

  return (
    <div style={{
      background: dark ? "#23232a" : "#fff",
      color: dark ? "#f3f4f6" : "#18181b",
      borderRadius: 16,
      padding: 24,
      maxWidth: 420,
      margin: "32px auto",
      boxShadow: "0 2px 12px rgba(37,99,235,0.10)"
    }}>
      <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 12, color: dark ? '#60a5fa' : '#2563eb' }}>Product Recommendation Chatbot</h3>
      {notification && (
        <div style={{ background: notification.type === 'error' ? '#ef4444' : '#fbbf24', color: '#18181b', padding: '10px 18px', borderRadius: 8, fontWeight: 600, marginBottom: 16, textAlign: 'center' }}>
          {notification.message}
        </div>
      )}
      {step === 0 && (
        <>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>👋 Hi! What category are you interested in?</div>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, border: dark ? '1px solid #444' : '1px solid #ccc', background: dark ? '#23232a' : '#fff', color: dark ? '#f3f4f6' : '#18181b', fontSize: 15 }}>
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
          </select>
          <button onClick={() => setStep(1)} style={{ marginTop: 12, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Next</button>
        </>
      )}
      {step === 1 && (
        <>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>💸 What's your minimum and maximum budget?</div>
          <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min Price" style={{ marginTop: 8, marginRight: 8, padding: '8px 12px', borderRadius: 8, border: dark ? '1px solid #444' : '1px solid #ccc', background: dark ? '#23232a' : '#fff', color: dark ? '#f3f4f6' : '#18181b', fontSize: 15 }} />
          <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max Price" style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, border: dark ? '1px solid #444' : '1px solid #ccc', background: dark ? '#23232a' : '#fff', color: dark ? '#f3f4f6' : '#18181b', fontSize: 15 }} />
          <button onClick={() => setStep(2)} style={{ marginTop: 12, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Next</button>
        </>
      )}
      {step === 2 && (
        <>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>🔎 Any specific product features or keywords?</div>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Type here..." style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, border: dark ? '1px solid #444' : '1px solid #ccc', background: dark ? '#23232a' : '#fff', color: dark ? '#f3f4f6' : '#18181b', fontSize: 15 }} />
          <button onClick={handleRecommend} style={{ marginTop: 12, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Show Recommendations</button>
        </>
      )}
      {step === 3 && (
        <>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>🎯 Here are the best products for you:</div>
          {recommendations.length === 0 && <div style={{ marginTop: 12 }}>No products found.</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
            {recommendations.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
