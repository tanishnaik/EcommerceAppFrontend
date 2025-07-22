import React, { createContext, useState, useCallback } from "react";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info", duration = 2500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              marginBottom: 12,
              background: toast.type === "success" ? "#22c55e" : toast.type === "error" ? "#ef4444" : "#2563eb",
              color: "#fff",
              borderRadius: 10,
              padding: "14px 28px",
              fontWeight: 700,
              fontSize: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              opacity: 0.97,
              transition: "all 0.3s",
              minWidth: 220,
              textAlign: "center",
              animation: "fadeIn 0.4s"
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
