import React, { useState } from "react";

// 360° Product Viewer (Demo with 4 images)
const Product360Viewer = ({ images }) => {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div style={{ position: "relative", width: 320, height: 320, margin: "auto" }}>
      <img
        src={images[idx]}
        alt={`Product 360 view ${idx+1}`}
        style={{ width: "100%", height: "100%", borderRadius: 16, boxShadow: "0 2px 12px #0002" }}
      />
      <button
        onClick={() => setIdx(i => (i - 1 + images.length) % images.length)}
        style={{ position: "absolute", top: "50%", left: 8, transform: "translateY(-50%)", background: "#23232a", color: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer" }}
        aria-label="Previous view"
      >
        ◀
      </button>
      <button
        onClick={() => setIdx(i => (i + 1) % images.length)}
        style={{ position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)", background: "#23232a", color: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer" }}
        aria-label="Next view"
      >
        ▶
      </button>
      <div style={{ position: "absolute", bottom: 8, left: 0, width: "100%", textAlign: "center", color: "#fff", fontWeight: 600, fontSize: 15 }}>
        {idx+1} / {images.length}
      </div>
    </div>
  );
};

export default Product360Viewer;
