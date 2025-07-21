import React from "react";
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
  const [orders, setOrders] = React.useState(getOrders());

  React.useEffect(() => {
    const handler = () => setOrders(getOrders());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <div style={{maxWidth:700,margin:"40px auto",background:"#fff",borderRadius:16,boxShadow:"0 2px 12px #2563eb22",padding:32}}>
      <h2 style={{fontSize:28,fontWeight:800,color:"#2563eb",marginBottom:24}}>Order History</h2>
      {orders.length === 0 ? (
        <div style={{color:"#64748b",fontSize:18}}>No orders found.</div>
      ) : (
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#f3f4f6"}}>
              <th style={{padding:12,textAlign:"left",fontWeight:700}}>Order ID</th>
              <th style={{padding:12,textAlign:"left",fontWeight:700}}>Date</th>
              <th style={{padding:12,textAlign:"left",fontWeight:700}}>Amount</th>
              <th style={{padding:12}}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order,i) => (
              <tr key={i} style={{borderBottom:"1px solid #e5e7eb"}}>
                <td style={{padding:12}}>{order.orderId}</td>
                <td style={{padding:12}}>{order.date || "-"}</td>
                <td style={{padding:12}}>₹{order.amount}</td>
                <td style={{padding:12}}>
                  <button onClick={()=>navigate(`/invoice/${order.orderId}`)} style={{background:"#2563eb",color:"#fff",border:"none",borderRadius:8,padding:"8px 18px",fontWeight:700,cursor:"pointer"}}>View Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
