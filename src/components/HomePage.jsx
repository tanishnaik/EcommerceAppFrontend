import React from "react";

const categories = [
  "Mobiles", "Electronics", "Fashion", "Home", "Appliances", "Beauty", "Toys", "Books", "Grocery"
];

const banners = [
  { id: 1, title: "Mega Sale! Up to 60% Off", bg: "#FF9900" },
  { id: 2, title: "New Arrivals: Mobiles & Gadgets", bg: "#232f3e", color: "#fff" },
  { id: 3, title: "Home Essentials Deals", bg: "#F0C14B" }
];

const HomePage = () => (
  <div style={{background: "#f0f0f0", minHeight: "100vh", paddingBottom: 40}}>
    {/* Categories */}
    <div style={{display: "flex", overflowX: "auto", gap: 18, padding: "18px 0 12px 18px", background: "#fff", boxShadow: "0 1px 4px #0001"}}>
      {categories.map(cat => (
        <div key={cat} style={{
          minWidth: 110,
          background: "#f0f0f0",
          borderRadius: 6,
          padding: "10px 18px",
          fontWeight: 700,
          color: "#232f3e",
          fontSize: 16,
          boxShadow: "0 1px 4px #0001",
          cursor: "pointer",
          border: "1.5px solid #e0e0e0",
          transition: "box-shadow 0.2s, border 0.2s",
        }}
        onMouseOver={e => e.currentTarget.style.boxShadow = '0 2px 8px #FF990055'}
        onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 4px #0001'}
        >{cat}</div>
      ))}
    </div>
    {/* Banners */}
    <div style={{display: "flex", gap: 18, margin: "28px 0 0 0", padding: "0 18px", overflowX: "auto"}}>
      {banners.map(b => (
        <div key={b.id} style={{
          minWidth: 320,
          height: 120,
          background: b.bg,
          color: b.color || "#232f3e",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 28,
          boxShadow: "0 2px 12px #0001",
          marginBottom: 8
        }}>{b.title}</div>
      ))}
    </div>
  </div>
);

export default HomePage;
