import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import Product360Viewer from "./Product360Viewer";

// Dummy products for outfit builder
const dummyProducts = [
  { id: 1, name: "T-Shirt", price: 799, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Jeans", price: 1499, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Sneakers", price: 1999, image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Jacket", price: 1299, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" }
];

// Outfit Builder (Demo)

const OutfitBuilder = () => {
  const [selected, setSelected] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedOutfits') || '[]');
    } catch {
      return [];
    }
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showVR, setShowVR] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleSave = () => {
    if (selected.length === 0) return;
    const outfit = dummyProducts.filter(p => selected.includes(p.id));
    const newOutfits = [...savedOutfits, outfit];
    setSavedOutfits(newOutfits);
    localStorage.setItem('savedOutfits', JSON.stringify(newOutfits));
    setSelected([]);
    setShowPreview(false);
  };

  const handleRemove = idx => {
    const newOutfits = savedOutfits.filter((_, i) => i !== idx);
    setSavedOutfits(newOutfits);
    localStorage.setItem('savedOutfits', JSON.stringify(newOutfits));
  };

  const handleAddToCart = () => {
    if (selected.length === 0) return;
    const outfit = dummyProducts.filter(p => selected.includes(p.id));
    outfit.forEach(item => addToCart(item));
    setSelected([]);
    setShowPreview(false);
    alert('Outfit added to cart!');
  };

  const previewImages = dummyProducts.filter(p => selected.includes(p.id));

  return (
    <div style={{ margin: "32px auto", maxWidth: 900, background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #2563eb11", padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ fontSize: 22, fontWeight: 700, color: "#2563eb", marginBottom: 18 }}>Outfit Builder</h3>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 18, justifyContent: 'center' }}>
        {dummyProducts.map(p => (
          <div key={p.id} style={{ textAlign: "center" }}>
            <img src={p.image} alt={p.name} style={{ width: 90, height: 90, borderRadius: 12, boxShadow: "0 1px 4px #2563eb22", marginBottom: 6 }} />
            <div style={{ fontWeight: 600, color: "#18181b", fontSize: 15 }}>{p.name}</div>
            <div style={{ color: '#2563eb', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>₹{p.price}</div>
            <button
              onClick={() => setSelected(sel => sel.includes(p.id) ? sel.filter(i => i !== p.id) : [...sel, p.id])}
              style={{
                marginTop: 6,
                background: selected.includes(p.id) ? "#60a5fa" : "#23232a",
                color: selected.includes(p.id) ? "#18181b" : "#f3f4f6",
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer"
              }}
            >
              {selected.includes(p.id) ? "Remove" : "Add"}
            </button>
          </div>
        ))}
      </div>
      <div style={{ fontWeight: 600, color: "#2563eb", fontSize: 16, marginBottom: 12 }}>
        Selected: {selected.length === 0 ? "None" : dummyProducts.filter(p => selected.includes(p.id)).map(p => `${p.name} (₹${p.price})`).join(", ")}
      </div>
      {selected.length > 0 && (
        <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 17, marginBottom: 10 }}>
          Total Price: ₹{dummyProducts.filter(p => selected.includes(p.id)).reduce((sum, p) => sum + (p.price || 0), 0)}
        </div>
      )}
      {selected.length > 0 && (
        <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => setShowPreview(p => !p)}
            style={{ background: '#60a5fa', color: '#18181b', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
          >
            {showPreview ? 'Hide Preview' : 'Preview Outfit'}
          </button>
          <button
            onClick={handleAddToCart}
            style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
          >
            Add Outfit to Cart
          </button>
          <button
            onClick={() => setShowVR(true)}
            style={{ background: '#fbbf24', color: '#18181b', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
          >
            VR Try-On
          </button>
          <button
            onClick={handleSave}
            style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
          >
            Save Outfit
          </button>
        </div>
      )}
      {showPreview && previewImages.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, alignItems: 'flex-end', justifyContent: 'center' }}>
          {previewImages.map((p, i) => (
            <img key={p.id} src={p.image} alt={p.name} style={{ width: 70, height: 70 + i * 10, borderRadius: 10, boxShadow: '0 1px 4px #2563eb22', objectFit: 'cover', zIndex: i, marginLeft: i > 0 ? -18 : 0, border: '2px solid #fff' }} />
          ))}
        </div>
      )}
      {showVR && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000a', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 24px #0008', position: 'relative', minWidth: 340 }}>
            <button onClick={() => setShowVR(false)} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', color: '#2563eb', fontSize: 28, cursor: 'pointer' }}>×</button>
            <h4 style={{ color: '#2563eb', fontWeight: 700, fontSize: 20, marginBottom: 18 }}>VR 360° Try-On</h4>
            <Product360Viewer images={previewImages.map(p => p.image)} />
          </div>
        </div>
      )}
      {savedOutfits.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h4 style={{ fontSize: 18, fontWeight: 700, color: '#2563eb', marginBottom: 10 }}>Saved Outfits</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center' }}>
            {savedOutfits.map((outfit, idx) => (
              <div key={idx} style={{ background: '#f3f4f6', borderRadius: 12, padding: 12, minWidth: 180, textAlign: 'center', boxShadow: '0 1px 4px #2563eb11', position: 'relative' }}>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 6 }}>
                  {outfit.map((p, i) => (
                    <img key={p.id} src={p.image} alt={p.name} style={{ width: 36, height: 36 + i * 6, borderRadius: 6, objectFit: 'cover', zIndex: i, marginLeft: i > 0 ? -8 : 0, border: '1.5px solid #fff' }} />
                  ))}
                </div>
                <div style={{ fontSize: 14, color: '#18181b', fontWeight: 600, marginBottom: 6 }}>{outfit.map(p => p.name).join(', ')}</div>
                <button
                  onClick={() => handleRemove(idx)}
                  style={{ position: 'absolute', top: 6, right: 8, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '2px 8px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitBuilder;
