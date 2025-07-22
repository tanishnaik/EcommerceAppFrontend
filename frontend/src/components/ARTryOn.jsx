import React, { useState } from "react";

// AR Try Before You Buy (Image Overlay Demo)
const ARTryOn = ({ productImage, overlayImage }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <div style={{ position: "relative", width: 320, height: 320, margin: "auto" }}>
      <img
        src={productImage}
        alt="Product"
        style={{ width: "100%", height: "100%", borderRadius: 16, boxShadow: "0 2px 12px #0002" }}
      />
      {showOverlay && overlayImage && (
        <img
          src={overlayImage}
          alt="AR Overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.7,
            borderRadius: 16,
            pointerEvents: "none",
            transition: "opacity 0.3s"
          }}
        />
      )}
      <button
        onClick={() => setShowOverlay(o => !o)}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          background: showOverlay ? "#60a5fa" : "#23232a",
          color: showOverlay ? "#18181b" : "#f3f4f6",
          border: "none",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 700,
          fontSize: 15,
          cursor: "pointer",
          boxShadow: "0 1px 4px #60a5fa44"
        }}
      >
        {showOverlay ? "Hide AR Preview" : "Try Before You Buy (AR)"}
      </button>
    </div>
  );
};

export default ARTryOn;
