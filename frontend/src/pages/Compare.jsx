import React, { useState, useEffect } from "react";

export default function Compare() {
  const [compareList, setCompareList] = useState(() => JSON.parse(localStorage.getItem("compareList") || "[]"));
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  if (!compareList.length) {
    return <div style={{ maxWidth: 800, margin: "60px auto", textAlign: "center", fontSize: 22, color: "#2563eb" }}>No products to compare.</div>;
  }

  const best = compareList.reduce((min, p) => (p.price < min.price ? p : min), compareList[0]);

  // Remove product from compare list
  const handleRemove = (id) => {
    const updated = compareList.filter((p) => p.id !== id);
    setCompareList(updated);
    localStorage.setItem("compareList", JSON.stringify(updated));
  };

  // Clear all
  const handleClear = () => {
    setCompareList([]);
    localStorage.setItem("compareList", "[]");
  };

  // Responsive grid/table styles
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${compareList.length}, minmax(220px, 1fr))`,
    gap: 0,
    marginBottom: 0,
    width: '100%',
    minWidth: compareList.length > 2 ? compareList.length * 240 : undefined,
    borderBottom: '1px solid #e5e7eb',
  };
  const cellStyle = {
    background: '#f8fafc',
    padding: '16px 8px',
    textAlign: 'center',
    borderBottom: '1px solid #e5e7eb',
    minHeight: 60,
    wordBreak: 'break-word',
  };
  const removeBtn = {
    background: '#e11d48',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '4px 12px',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    marginTop: 8,
  };
  const bestBadge = {
    background: '#22c55e',
    color: '#fff',
    borderRadius: 8,
    padding: '2px 10px',
    fontWeight: 700,
    fontSize: 13,
    marginLeft: 6,
  };
  const containerStyle = {
    maxWidth: 1200,
    margin: '40px auto',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    padding: 16,
    overflowX: 'visible',
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button onClick={handleClear} style={removeBtn}>Clear All</button>
      </div>
      {/* Images */}
      <div style={gridStyle}>
        {compareList.map((p) => (
          <div key={p.id} style={cellStyle}>
            {p.image && <img src={p.image} alt={p.name} style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 8 }} />}
          </div>
        ))}
      </div>
      {/* Name */}
      <div style={gridStyle}>
        {compareList.map((p) => (
          <div key={p.id} style={cellStyle}>{p.name}</div>
        ))}
      </div>
      {/* Price */}
      <div style={gridStyle}>
        {compareList.map((p) => (
          <div key={p.id} style={cellStyle}>
            ₹{p.price}
            {best.id === p.id && <span style={bestBadge}>Best Price</span>}
          </div>
        ))}
      </div>
      {/* Category */}
      <div style={gridStyle}>
        {compareList.map((p) => (
          <div key={p.id} style={cellStyle}>{p.category}</div>
        ))}
      </div>
      {/* Ratings */}
      <div style={gridStyle}>
        {compareList.map((p) => (
          <div key={p.id} style={cellStyle}>{p.rating || '-'} / 5</div>
        ))}
      </div>
      {/* Availability */}
      <div style={gridStyle}>
        {compareList.map((p) => (
          <div key={p.id} style={cellStyle}>{p.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
        ))}
      </div>
      {/* Description */}
      <div style={gridStyle}>
        {compareList.map((p) => (
          <div key={p.id} style={cellStyle}>{p.description || '-'}</div>
        ))}
      </div>
      {/* Features/Tags (if any) */}
      <div style={gridStyle}>
        {compareList.map((p) => (
          <div key={p.id} style={cellStyle}>{Array.isArray(p.tags) ? p.tags.join(', ') : '-'}</div>
        ))}
      </div>
      {/* Remove buttons */}
      <div style={gridStyle}>
        {compareList.map((p) => (
          <div key={p.id} style={cellStyle}>
            <button onClick={() => handleRemove(p.id)} style={removeBtn}>Remove</button>
          </div>
        ))}
      </div>
      {/* Suggestion */}
      <div style={{ marginTop: 32, textAlign: "center", fontSize: 20, color: "#22c55e", fontWeight: 700 }}>
        Suggestion: <span style={{ color: "#2563eb" }}>{best.name}</span> has the best price!
      </div>
    </div>
  );
}
