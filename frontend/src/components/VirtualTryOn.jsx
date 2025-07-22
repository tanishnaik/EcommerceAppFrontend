import React, { useRef, useState } from "react";

const clothingOptions = [
  {
    name: "T-Shirt",
    url: "https://i.imgur.com/4A7IjQk.png", // transparent PNG
  },
  {
    name: "Jacket",
    url: "https://i.imgur.com/8Km9tLL.png", // transparent PNG
  },
  {
    name: "Dress",
    url: "https://i.imgur.com/1bX5QH6.png", // transparent PNG
  },
];

export default function VirtualTryOn() {
  const [userImg, setUserImg] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [overlay, setOverlay] = useState({
    x: 50,
    y: 50,
    width: 180,
    height: 180,
  });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [overlayStart, setOverlayStart] = useState({ x: 0, y: 0 });
  const inputRef = useRef();

  const handleUserImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUserImg(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClothing = (url) => {
    setClothing(url);
    setOverlay({ ...overlay, x: 50, y: 50, width: 180, height: 180 });
  };

  const handleReset = () => {
    setUserImg(null);
    setClothing(null);
    setOverlay({ x: 50, y: 50, width: 180, height: 180 });
  };

  // Drag overlay
  const onMouseDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setOverlayStart({ x: overlay.x, y: overlay.y });
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setOverlay((prev) => ({ ...prev, x: overlayStart.x + dx, y: overlayStart.y + dy }));
  };
  const onMouseUp = () => setDragging(false);

  // Resize overlay
  const handleResize = (delta) => {
    setOverlay((prev) => ({
      ...prev,
      width: Math.max(60, prev.width + delta),
      height: Math.max(60, prev.height + delta),
    }));
  };

  // Remove overlay
  const handleRemoveOverlay = () => setClothing(null);

  // Inline styles
  const container = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    padding: 32,
  };
  const card = {
    background: "#fff",
    borderRadius: 24,
    boxShadow: "0 4px 32px rgba(37,99,235,0.10)",
    padding: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 340,
    maxWidth: 420,
    marginBottom: 32,
  };
  const previewBox = {
    position: "relative",
    width: 320,
    height: 400,
    background: "#e0e7ef",
    borderRadius: 18,
    boxShadow: "0 2px 12px rgba(37,99,235,0.10)",
    overflow: "hidden",
    marginBottom: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const userImgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: userImg ? "none" : "grayscale(0.7)",
    opacity: userImg ? 1 : 0.5,
    borderRadius: 18,
    background: "#e0e7ef",
  };
  const overlayStyle = {
    position: "absolute",
    left: overlay.x,
    top: overlay.y,
    width: overlay.width,
    height: overlay.height,
    cursor: dragging ? "grabbing" : "grab",
    zIndex: 2,
    transition: dragging ? "none" : "box-shadow 0.2s",
    boxShadow: dragging ? "0 0 0 2px #2563eb" : "0 2px 8px rgba(37,99,235,0.10)",
    borderRadius: 12,
    background: "transparent",
    userSelect: "none",
  };
  const removeBtn = {
    position: "absolute",
    top: -16,
    right: -16,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 16,
    width: 32,
    height: 32,
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
    zIndex: 3,
  };
  const controls = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
    marginTop: 12,
    width: "100%",
  };
  const sliderRow = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 6,
  };
  const slider = {
    width: 120,
  };
  const btn = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 22px",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    margin: "0 8px",
    boxShadow: "0 1px 4px rgba(37,99,235,0.10)",
    transition: "background 0.2s",
  };
  const clothingList = {
    display: "flex",
    gap: 18,
    margin: "18px 0 0 0",
    justifyContent: "center",
  };
  const clothingImg = {
    width: 60,
    height: 60,
    objectFit: "contain",
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 1px 4px rgba(37,99,235,0.10)",
    border: clothing ? "2px solid #2563eb" : "2px solid #e5e7eb",
    cursor: "pointer",
    transition: "border 0.2s",
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ fontWeight: 800, fontSize: 24, color: "#2563eb", marginBottom: 18, letterSpacing: -1 }}>Virtual Try-On</h2>
        <div style={previewBox}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {userImg ? (
            <img src={userImg} alt="User" style={userImgStyle} />
          ) : (
            <div style={{...userImgStyle, display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: 18}}>
              Upload your photo
            </div>
          )}
          {clothing && (
            <>
              <img
                src={clothing}
                alt="Clothing overlay"
                style={overlayStyle}
                draggable={false}
                onMouseDown={onMouseDown}
              />
              <button style={removeBtn} onClick={handleRemoveOverlay} title="Remove overlay">✖</button>
            </>
          )}
        </div>
        <div style={controls}>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleUserImg}
          />
          <button style={btn} onClick={() => inputRef.current.click()}>{userImg ? "Change Photo" : "Upload Photo"}</button>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#2563eb", margin: "8px 0 0 0" }}>Choose Clothing</div>
          <div style={clothingList}>
            {clothingOptions.map(opt => (
              <img
                key={opt.name}
                src={opt.url}
                alt={opt.name}
                style={{ ...clothingImg, border: clothing === opt.url ? "2px solid #2563eb" : "2px solid #e5e7eb" }}
                onClick={() => handleClothing(opt.url)}
                title={opt.name}
              />
            ))}
          </div>
          {clothing && (
            <>
              <div style={sliderRow}>
                <span style={{ color: "#2563eb", fontWeight: 600 }}>Size</span>
                <input
                  type="range"
                  min={60}
                  max={320}
                  value={overlay.width}
                  onChange={e => setOverlay(prev => ({ ...prev, width: +e.target.value, height: +e.target.value }))}
                  style={slider}
                />
                <span style={{ color: "#2563eb", fontWeight: 600 }}>{overlay.width}px</span>
              </div>
              <div style={sliderRow}>
                <span style={{ color: "#2563eb", fontWeight: 600 }}>X</span>
                <input
                  type="range"
                  min={0}
                  max={240}
                  value={overlay.x}
                  onChange={e => setOverlay(prev => ({ ...prev, x: +e.target.value }))}
                  style={slider}
                />
                <span style={{ color: "#2563eb", fontWeight: 600 }}>{overlay.x}px</span>
              </div>
              <div style={sliderRow}>
                <span style={{ color: "#2563eb", fontWeight: 600 }}>Y</span>
                <input
                  type="range"
                  min={0}
                  max={320}
                  value={overlay.y}
                  onChange={e => setOverlay(prev => ({ ...prev, y: +e.target.value }))}
                  style={slider}
                />
                <span style={{ color: "#2563eb", fontWeight: 600 }}>{overlay.y}px</span>
              </div>
            </>
          )}
          <button style={{ ...btn, background: "#e11d48", marginTop: 18 }} onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div style={{ color: "#888", fontSize: 15, marginTop: 12, textAlign: "center", maxWidth: 420 }}>
        <b>How it works:</b> Upload your photo, pick a clothing item, then drag or resize the overlay to fit. All processing is done in your browser.
      </div>
    </div>
  );
}
