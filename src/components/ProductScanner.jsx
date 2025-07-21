import React, { useState } from "react";

// Product Scanner UI (Demo)
const ProductScanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  const [code, setCode] = useState("");
  return (
    <div style={{ margin: "24px auto", textAlign: "center" }}>
      <button
        onClick={() => setScanning(s => !s)}
        style={{
          background: scanning ? "#a3e635" : "#2563eb",
          color: scanning ? "#18181b" : "#fff",
          border: "none",
          borderRadius: 8,
          padding: "10px 24px",
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 12,
          boxShadow: "0 1px 4px #2563eb22"
        }}
      >
        {scanning ? "Stop Scanning" : "Scan Product QR/Barcode"}
      </button>
      {scanning && (
        <div style={{ marginTop: 12 }}>
          <input
            type="text"
            placeholder="Enter or scan code..."
            value={code}
            onChange={e => setCode(e.target.value)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1.5px solid #2563eb",
              fontSize: 16,
              width: 220,
              marginRight: 8
            }}
          />
          <button
            onClick={() => { onScan && onScan(code); setScanning(false); setCode(""); }}
            style={{
              background: "#60a5fa",
              color: "#18181b",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer"
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductScanner;
