import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderTrackingTimeline from "./OrderTrackingTimeline";

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem("orderHistory") || "[]");
  } catch {
    return [];
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleString();
}

const InvoicePage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const orders = getOrders();
  const order = orders.find(o => o.orderId === orderId);

  const downloadInvoice = () => {
    const el = document.createElement("a");
    const html = document.getElementById("invoice-content").outerHTML;
    const blob = new Blob([
      `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Invoice ${orderId}</title></head><body>${html}</body></html>`
    ], {type: "text/html"});
    el.href = URL.createObjectURL(blob);
    el.download = `Invoice_${orderId}.html`;
    el.click();
  };

  if (!order) return (
    <div style={{maxWidth:600,margin:"40px auto",background:"#fff",borderRadius:16,boxShadow:"0 2px 12px #2563eb22",padding:32}}>
      <h2 style={{fontSize:28,fontWeight:800,color:"#2563eb",marginBottom:24}}>Invoice Not Found</h2>
      <button onClick={()=>navigate("/orders")} style={{background:"#2563eb",color:"#fff",border:"none",borderRadius:8,padding:"10px 24px",fontWeight:700,cursor:"pointer"}}>Back to Orders</button>
    </div>
  );

  // Dummy: derive currentStep from orderId hash for demo
  const steps = [
    { label: "Ordered", date: order.date ? formatDate(order.date) : null },
    { label: "Packed", date: null },
    { label: "Shipped", date: null },
    { label: "Out for Delivery", date: null },
    { label: "Delivered", date: null },
  ];
  // For demo, randomize currentStep based on orderId
  let currentStep = 0;
  if (order.orderId) {
    const n = parseInt(order.orderId.replace(/\D/g, "").slice(-1)) || 0;
    currentStep = Math.min(4, n % 5);
    for (let i = 1; i <= currentStep; ++i) steps[i].date = new Date(Date.now() - (currentStep - i) * 86400000).toLocaleDateString();
  }
  return (
    <div style={{maxWidth:700,margin:"40px auto",background:"#fff",borderRadius:16,boxShadow:"0 2px 12px #2563eb22",padding:32}}>
      <OrderTrackingTimeline steps={steps} currentStep={currentStep} />
      <div id="invoice-content">
        <h2 style={{fontSize:28,fontWeight:800,color:"#2563eb",marginBottom:8}}>Invoice</h2>
        <div style={{color:"#64748b",marginBottom:18}}>Order ID: <b>{order.orderId}</b></div>
        <div style={{marginBottom:8}}>Date: <b>{formatDate(order.date)}</b></div>
        <div style={{marginBottom:8}}>Customer: <b>{order.form?.name || "Customer"}</b></div>
        <div style={{marginBottom:8}}>Address: <b>{order.form?.address || "-"}</b></div>
        <div style={{marginBottom:8}}>Payment Mode: <b>{order.form?.payment || "-"}</b></div>
        <div style={{marginBottom:18}}>Amount Paid: <b style={{color:'#2563eb'}}>₹{order.amount}</b></div>
        <h3 style={{fontSize:20,fontWeight:700,marginTop:18,marginBottom:8}}>Products</h3>
        <table style={{width:"100%",borderCollapse:"collapse",marginBottom:18}}>
          <thead>
            <tr style={{background:"#f3f4f6"}}>
              <th style={{padding:8,textAlign:"left"}}>Name</th>
              <th style={{padding:8,textAlign:"left"}}>Qty</th>
              <th style={{padding:8,textAlign:"left"}}>Price</th>
              <th style={{padding:8,textAlign:"left"}}>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.products?.map((p,i) => (
              <tr key={i} style={{borderBottom:"1px solid #e5e7eb"}}>
                <td style={{padding:8}}>{p.name}</td>
                <td style={{padding:8}}>{p.qty}</td>
                <td style={{padding:8}}>₹{p.price}</td>
                <td style={{padding:8}}>₹{p.price * p.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginTop:18,fontWeight:700}}>Grand Total: <span style={{color:'#2563eb'}}>₹{order.amount}</span></div>
      </div>
      <button onClick={downloadInvoice} style={{background:"#22c55e",color:"#fff",border:"none",borderRadius:8,padding:"10px 24px",fontWeight:700,cursor:"pointer",marginTop:24,marginRight:16}}>Download Invoice</button>
      <button onClick={()=>navigate("/orders")} style={{background:"#2563eb",color:"#fff",border:"none",borderRadius:8,padding:"10px 24px",fontWeight:700,cursor:"pointer",marginTop:24}}>Back to Orders</button>
    </div>
  );
};

export default InvoicePage;
