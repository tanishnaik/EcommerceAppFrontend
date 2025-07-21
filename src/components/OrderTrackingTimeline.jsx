import React from "react";

// Example steps: Ordered, Packed, Shipped, Out for Delivery, Delivered
const defaultSteps = [
  { label: "Ordered", date: "2025-07-18" },
  { label: "Packed", date: "2025-07-19" },
  { label: "Shipped", date: "2025-07-20" },
  { label: "Out for Delivery", date: null },
  { label: "Delivered", date: null },
];

const getStatusColor = (status, active) => {
  if (active) return "#22c55e"; // green
  if (status) return "#2563eb"; // blue
  return "#d1d5db"; // gray
};

const OrderTrackingTimeline = ({ steps = defaultSteps, currentStep = 2 }) => {
  // currentStep: 0-based index of the current status (e.g., 2 = Shipped)
  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 12px #2563eb11",
      padding: 32,
      maxWidth: 700,
      margin: "40px auto",
      fontFamily: "'Segoe UI', Arial, sans-serif"
    }}>
      <h2 style={{fontSize: 24, fontWeight: 800, color: "#2563eb", marginBottom: 32}}>Order Tracking</h2>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", margin: "40px 0 24px 0"}}>
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          return (
            <div key={i} style={{flex: 1, textAlign: "center", position: "relative"}}>
              {/* Circle */}
              <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: isActive ? "#22c55e" : isCompleted ? "#2563eb" : "#d1d5db",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 18,
                margin: "0 auto",
                boxShadow: isActive ? "0 2px 8px #22c55e44" : isCompleted ? "0 2px 8px #2563eb22" : "none",
                border: isActive ? "3px solid #bbf7d0" : isCompleted ? "2px solid #93c5fd" : "2px solid #e5e7eb",
                transition: "background 0.3s, border 0.3s"
              }}>
                {isCompleted ? "✓" : i + 1}
              </div>
              {/* Label */}
              <div style={{marginTop: 10, fontWeight: isActive ? 700 : 500, color: isActive ? "#22c55e" : isCompleted ? "#2563eb" : "#64748b", fontSize: 16}}>{step.label}</div>
              {/* Date */}
              {step.date && <div style={{fontSize: 13, color: "#64748b", marginTop: 2}}>{step.date}</div>}
              {/* Connector */}
              {i < steps.length - 1 && (
                <div style={{
                  position: "absolute",
                  top: 18,
                  left: "50%",
                  width: "100%",
                  height: 4,
                  background: i < currentStep ? "#2563eb" : "#e5e7eb",
                  zIndex: -1,
                  transform: "translateX(18px)",
                  transition: "background 0.3s"
                }}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTrackingTimeline;
