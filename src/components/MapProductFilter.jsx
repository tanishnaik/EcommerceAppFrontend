import React, { useState } from "react";

const cities = [
  { name: "Delhi", available: true },
  { name: "Mumbai", available: true },
  { name: "Bangalore", available: false },
  { name: "Chennai", available: true },
  { name: "Kolkata", available: false },
  { name: "Hyderabad", available: true }
];

const MapProductFilter = ({ onFilter }) => {
  const [selected, setSelected] = useState("");
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #2563eb11', padding: 24, margin: '32px auto', maxWidth: 500, textAlign: 'center' }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#2563eb', marginBottom: 16 }}>Map-Based Product Filter</h3>
      <img src="https://i.ibb.co/6bQ7QpT/india-map-demo.png" alt="Map" style={{ width: 320, borderRadius: 12, marginBottom: 16, boxShadow: '0 1px 8px #2563eb22' }} />
      <select value={selected} onChange={e => { setSelected(e.target.value); onFilter && onFilter(e.target.value); }} style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #2563eb', fontSize: 16, marginBottom: 12 }}>
        <option value="">Select City</option>
        {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
      </select>
      {selected && (
        <div style={{ marginTop: 10, color: cities.find(c => c.name === selected)?.available ? '#22c55e' : '#ef4444', fontWeight: 700 }}>
          {cities.find(c => c.name === selected)?.available ? 'Delivery Available' : 'Not Available'} in {selected}
        </div>
      )}
    </div>
  );
};

export default MapProductFilter;
