import React, { useState } from "react";

// Product Unboxing Animation (Demo)
const UnboxingAnimation = ({ productImage }) => {
  const [unboxed, setUnboxed] = useState(false);
  return (
    <div style={{ position: "relative", width: 320, height: 320, margin: "auto" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: unboxed ? "transparent" : "#eab308",
          borderRadius: 16,
          boxShadow: "0 2px 12px #0002",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          color: "#fff",
          zIndex: 2,
          transition: "background 0.7s, opacity 0.7s",
          opacity: unboxed ? 0 : 1
        }}
      >
        📦
      </div>
      <img
        src={productImage}
        alt="Product"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 16,
          boxShadow: "0 2px 12px #0002",
          opacity: unboxed ? 1 : 0,
          transition: "opacity 0.7s"
        }}
      />
      <button
        onClick={() => setUnboxed(true)}
        disabled={unboxed}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          background: unboxed ? "#a3a3a3" : "#60a5fa",
          color: "#18181b",
          border: "none",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 700,
          fontSize: 15,
          cursor: unboxed ? "not-allowed" : "pointer",
          boxShadow: "0 1px 4px #60a5fa44"
        }}
      >
        {unboxed ? "Unboxed!" : "Unbox Product"}
      </button>
    </div>
  );
};

export default UnboxingAnimation;
