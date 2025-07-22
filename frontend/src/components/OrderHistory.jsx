import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

// Get orders from localStorage
function getOrders() {
  try {
    return JSON.parse(localStorage.getItem("orderHistory") || "[]");
  } catch {
    return [];
  }
}

const OrderHistory = () => {
  const navigate = useNavigate();
  const { dark } = useContext(ThemeContext);
  const [orders, setOrders] = React.useState(getOrders());
  const [notification, setNotification] = useState(null);

  React.useEffect(() => {
    const handler = () => setOrders(getOrders());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleClearOrders = () => {
    localStorage.removeItem("orderHistory");
    setOrders([]);
  };

  const containerStyle = {
    maxWidth: 700,
    margin: "40px auto",
    background: dark ? "#18181b" : "#fff",
    borderRadius: 16,
    boxShadow: dark ? "0 2px 12px #2563eb66" : "0 2px 12px #2563eb22",
    padding: 32,
    color: dark ? "#f3f4f6" : "#18181b"
  };
  const titleStyle = {
    fontSize: 28,
    fontWeight: 800,
    color: dark ? "#60a5fa" : "#2563eb",
    marginBottom: 24
  };
  const emptyStyle = {
    color: dark ? "#d1d5db" : "#64748b",
    fontSize: 18
  };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    background: dark ? "#23232a" : "#fff",
    color: dark ? "#f3f4f6" : "#18181b"
  };
  const thStyle = {
    padding: 12,
    textAlign: "left",
    fontWeight: 700,
    background: dark ? "#23232a" : "#f3f4f6",
    color: dark ? "#60a5fa" : "#2563eb"
  };
  const tdStyle = {
    padding: 12
  };
  const trStyle = {
    borderBottom: dark ? "1px solid #444" : "1px solid #e5e7eb"
  };
  const btnStyle = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 18px",
    fontWeight: 700,
    cursor: "pointer"
  };
  const clearBtnStyle = {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 18px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    marginBottom: 16,
    float: "right"
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Order History</h2>
      {orders.length > 0 && (
        <button onClick={handleClearOrders} style={clearBtnStyle}>Clear Order History</button>
      )}
      {notification && (
        <div style={{ background: notification.type === 'info' ? '#fbbf24' : '#ef4444', color: '#18181b', padding: '10px 18px', borderRadius: 8, fontWeight: 600, marginBottom: 16, textAlign: 'center' }}>
          {notification.message}
        </div>
      )}
      {orders.length === 0 ? (
        <div style={emptyStyle}>No orders found.</div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Return Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order,i) => {
              // Calculate days left for return
              let daysLeft = null;
              let canReturn = false;
              let returnStatus = order.returnStatus || "Not Requested";
              if (order.date) {
                const orderDate = new Date(order.date);
                const now = new Date();
                const diff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
                daysLeft = Math.max(0, 7 - diff);
                canReturn = diff < 7 && returnStatus === "Not Requested";
              }
              return (
                <tr key={i} style={trStyle}>
                  <td style={tdStyle}>{order.orderId}</td>
                  <td style={tdStyle}>{order.date || "-"}</td>
                  <td style={tdStyle}>₹{order.amount}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <button onClick={()=>navigate(`/invoice/${order.orderId}`)} style={btnStyle}>View Invoice</button>
                      {canReturn && (
                        <button
                          style={{...btnStyle, background:'#ef4444', marginTop:8, fontWeight:600}}
                          onClick={() => {
                            // Simulate Amazon/Flipkart-like return flow
                            setNotification({
                              type: 'info',
                              message: 'Return request submitted! Pickup will be scheduled and refund processed within 2-3 days.'
                            });
                            setTimeout(() => setNotification(null), 5000);
                            const updatedOrders = orders.map((o, idx) => idx === i ? { ...o, returnStatus: "Requested", returnRequestedDate: new Date().toISOString() } : o);
                            localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
                            setOrders(updatedOrders);
                          }}
                        >
                          Return Product
                        </button>
                      )}
                      {returnStatus === "Requested" && (
                        <span style={{ color: '#fbbf24', fontWeight: 600, marginTop: 8 }}>Return Requested - Awaiting Pickup</span>
                      )}
                      {returnStatus === "Completed" && (
                        <span style={{ color: '#22c55e', fontWeight: 600, marginTop: 8 }}>Returned & Refunded</span>
                      )}
                      {daysLeft !== null && returnStatus === "Not Requested" && (
                        <span style={{ color: '#fbbf24', fontWeight: 500, marginTop: 8, fontSize: 13 }}>
                          {daysLeft} day{daysLeft !== 1 ? 's' : ''} left to return
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
