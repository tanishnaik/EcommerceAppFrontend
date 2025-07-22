import React, { useState } from "react";

const prizes = [5, 10, 15, 20, 25, 30, 40, 50];

const SpinWheelDiscount = ({ onResult }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [angle, setAngle] = useState(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const idx = Math.floor(Math.random() * prizes.length);
    const deg = 360 * 5 + (360 / prizes.length) * idx;
    setAngle(deg);
    setTimeout(() => {
      setResult(prizes[idx]);
      setSpinning(false);
      onResult && onResult(prizes[idx]);
    }, 3200);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #2563eb11', padding: 24, margin: '32px auto', maxWidth: 400, textAlign: 'center' }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#2563eb', marginBottom: 16 }}>🎁 Spin Wheel Discount</h3>
      <div style={{ position: 'relative', width: 180, height: 180, margin: 'auto' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 180, height: 180, borderRadius: '50%', border: '8px solid #2563eb', background: '#f3f4f6', boxShadow: '0 1px 8px #2563eb22', overflow: 'hidden', transition: 'transform 3.2s cubic-bezier(.17,.67,.83,.67)', transform: `rotate(${angle}deg)` }}>
          {prizes.map((p, i) => (
            <div key={i} style={{ position: 'absolute', left: 90, top: 90, width: 90, height: 90, transform: `rotate(${(360 / prizes.length) * i}deg) translate(0, -90px)`, transformOrigin: '0 90px', background: i % 2 === 0 ? '#60a5fa' : '#fbbf24', color: '#18181b', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
              {p}%
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 80, top: -18, width: 20, height: 40, background: '#ef4444', borderRadius: '0 0 10px 10px', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>▼</span>
        </div>
      </div>
      <button onClick={spin} disabled={spinning} style={{ marginTop: 18, background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 16, cursor: spinning ? 'not-allowed' : 'pointer' }}>Spin</button>
      {result && <div style={{ marginTop: 16, color: '#22c55e', fontWeight: 700, fontSize: 18 }}>You won {result}% OFF!</div>}
    </div>
  );
};

export default SpinWheelDiscount;
