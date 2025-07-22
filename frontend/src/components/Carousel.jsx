import React, { useEffect, useRef, useState } from "react";

const carouselStyle = {
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',
  borderRadius: 18,
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(37,99,235,0.10)',
  marginBottom: 36,
  position: 'relative',
};
const slideStyle = {
  width: '100%',
  height: 320,
  objectFit: 'cover',
  transition: 'transform 0.7s cubic-bezier(.4,0,.2,1)',
  borderRadius: 18,
};
const navBtn = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: 38,
  height: 38,
  fontSize: 22,
  cursor: 'pointer',
  zIndex: 2,
  opacity: 0.85,
  transition: 'background 0.2s',
};

export default function Carousel({ slides }) {
  const [idx, setIdx] = useState(0);
  const timeout = useRef();

  useEffect(() => {
    timeout.current = setTimeout(() => setIdx((i) => (i + 1) % slides.length), 3500);
    return () => clearTimeout(timeout.current);
  }, [idx, slides.length]);

  return (
    <div style={carouselStyle}>
      <img src={slides[idx].image} alt={slides[idx].title} style={slideStyle} />
      <button style={{ ...navBtn, left: 16 }} onClick={() => setIdx((idx - 1 + slides.length) % slides.length)}>&lt;</button>
      <button style={{ ...navBtn, right: 16 }} onClick={() => setIdx((idx + 1) % slides.length)}>&gt;</button>
      <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {slides.map((_, i) => (
          <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i === idx ? '#2563eb' : '#e0e7ff', display: 'inline-block' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 32, left: 32, color: '#fff', fontWeight: 800, fontSize: 28, textShadow: '0 2px 8px #0008' }}>
        {slides[idx].title}
      </div>
    </div>
  );
}
