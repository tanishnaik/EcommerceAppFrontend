import React, { useState } from "react";

const skinTones = [
  { name: "Light", color: "#fbeee6" },
  { name: "Medium", color: "#e0b084" },
  { name: "Tan", color: "#c68642" },
  { name: "Dark", color: "#8d5524" }
];
const overlays = [
  { name: "Lipstick", img: "https://pngimg.com/uploads/lipstick/lipstick_PNG101.png" },
  { name: "Sunglasses", img: "https://pngimg.com/uploads/sunglasses/sunglasses_PNG44.png" }
];

const SkinTonePreview = () => {
  const [tone, setTone] = useState(skinTones[0]);
  const [overlay, setOverlay] = useState(overlays[0]);
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #2563eb11', padding: 24, margin: '32px auto', maxWidth: 400, textAlign: 'center' }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#2563eb', marginBottom: 16 }}>Skin Tone Preview</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
        {skinTones.map(s => (
          <button key={s.name} onClick={() => setTone(s)} style={{ background: s.color, border: tone.name === s.name ? '2px solid #2563eb' : '1.5px solid #ccc', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer' }} title={s.name} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
        {overlays.map(o => (
          <button key={o.name} onClick={() => setOverlay(o)} style={{ background: '#f3f4f6', border: overlay.name === o.name ? '2px solid #2563eb' : '1.5px solid #ccc', borderRadius: 8, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>{o.name}</button>
        ))}
      </div>
      <div style={{ position: 'relative', width: 160, height: 180, margin: 'auto', background: tone.color, borderRadius: '50%', boxShadow: '0 1px 8px #0001' }}>
        <img src="https://i.ibb.co/6bQ7QpT/face-demo.png" alt="Face" style={{ width: 160, height: 180, borderRadius: '50%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
        <img src={overlay.img} alt={overlay.name} style={{ position: 'absolute', top: overlay.name === 'Lipstick' ? 110 : 50, left: overlay.name === 'Lipstick' ? 60 : 30, width: overlay.name === 'Lipstick' ? 40 : 100, height: overlay.name === 'Lipstick' ? 20 : 40, opacity: 0.85, pointerEvents: 'none' }} />
      </div>
      <div style={{ marginTop: 10, color: '#18181b', fontWeight: 600 }}>{tone.name} Skin Tone + {overlay.name}</div>
    </div>
  );
};

export default SkinTonePreview;
