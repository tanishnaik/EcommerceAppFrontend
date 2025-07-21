import React, { useState } from "react";

const items = [
  { id: 1, name: "T-Shirt", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Jeans", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Sneakers", img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Jacket", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" }
];

const DragDropOutfitBuilder = () => {
  const [mannequin, setMannequin] = useState([]);
  const onDrop = (e) => {
    const id = Number(e.dataTransfer.getData('id'));
    if (!mannequin.includes(id)) setMannequin([...mannequin, id]);
  };
  const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };
  const removeItem = id => setMannequin(mannequin.filter(i => i !== id));
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #2563eb11', padding: 24, margin: '32px auto', maxWidth: 700 }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#2563eb', marginBottom: 16 }}>Drag & Drop Outfit Builder</h3>
      <div style={{ display: 'flex', gap: 24, marginBottom: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map(item => (
          <div key={item.id} draggable onDragStart={e => onDragStart(e, item.id)} style={{ textAlign: 'center', cursor: 'grab', border: '1.5px solid #2563eb', borderRadius: 10, padding: 8, background: '#f3f4f6', width: 90 }}>
            <img src={item.img} alt={item.name} style={{ width: 70, height: 70, borderRadius: 8, marginBottom: 4 }} />
            <div style={{ fontWeight: 600, color: '#18181b', fontSize: 15 }}>{item.name}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: 220, margin: '24px 0' }}>
        <div onDrop={onDrop} onDragOver={e => e.preventDefault()} style={{ width: 120, height: 220, background: '#e0e7ff', borderRadius: 16, boxShadow: '0 1px 8px #2563eb22', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <img src="https://i.ibb.co/6bQ7QpT/face-demo.png" alt="Mannequin" style={{ width: 100, height: 200, borderRadius: 16, position: 'absolute', bottom: 0, left: 10, opacity: 0.7 }} />
          {mannequin.map((id, idx) => {
            const item = items.find(i => i.id === id);
            return (
              <img key={id} src={item.img} alt={item.name} style={{ width: 70, height: 70, borderRadius: 8, position: 'absolute', left: 25, bottom: 30 + idx * 30, boxShadow: '0 1px 4px #2563eb22', border: '2px solid #fff' }} />
            );
          })}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 10 }}>
        {mannequin.map(id => {
          const item = items.find(i => i.id === id);
          return (
            <button key={id} onClick={() => removeItem(id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 10px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Remove {item.name}</button>
          );
        })}
      </div>
    </div>
  );
};

export default DragDropOutfitBuilder;
