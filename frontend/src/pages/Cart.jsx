import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useGlobalSettings } from "../components/GlobalSettingsContext";
import { CartContext } from "../context/CartContext";
import { ToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

const container = (dark) => ({
  maxWidth: 900,
  margin: '40px auto',
  padding: '32px 16px',
  background: dark ? '#18181b' : '#fff',
  color: dark ? '#f3f4f6' : '#18181b',
  borderRadius: 18,
  boxShadow: dark ? '0 4px 24px rgba(37,99,235,0.18)' : '0 4px 24px rgba(37,99,235,0.08)',
  minHeight: '100vh',
});
const title = (dark) => ({
  fontSize: 28,
  fontWeight: 700,
  color: dark ? '#60a5fa' : '#1e40af',
  marginBottom: 32,
});
const table = (dark) => ({
  width: '100%',
  marginBottom: 32,
  borderCollapse: 'collapse',
  color: dark ? '#f3f4f6' : '#18181b',
});
const th = (dark) => ({
  textAlign: 'left',
  color: dark ? '#60a5fa' : '#2563eb',
  fontWeight: 700,
  padding: '12px 8px',
  fontSize: 16,
  borderBottom: dark ? '2px solid #334155' : '2px solid #e0e7ff',
});
const td = (dark) => ({
  padding: '16px 8px',
  fontSize: 15,
  borderBottom: dark ? '1px solid #334155' : '1px solid #e5e7eb',
  verticalAlign: 'middle',
  color: dark ? '#f3f4f6' : '#18181b',
});
const img = {
  height: 64,
  width: 64,
  objectFit: 'cover',
  borderRadius: 10,
  marginRight: 16,
  boxShadow: '0 1px 6px rgba(37,99,235,0.10)',
};
const qtyBtn = (dark) => ({
  padding: '4px 12px',
  fontSize: 18,
  border: 'none',
  background: dark ? '#334155' : '#e0e7ff',
  color: dark ? '#60a5fa' : '#2563eb',
  borderRadius: 6,
  margin: '0 4px',
  cursor: 'pointer',
  fontWeight: 700,
  transition: 'background 0.2s',
});
const removeBtn = (dark) => ({
  color: '#ef4444',
  background: dark ? '#23232a' : 'none',
  border: 'none',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 15,
  padding: '4px 10px',
  borderRadius: 6,
  transition: 'background 0.2s',
});
const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 24,
};
const totalText = (dark) => ({
  fontSize: 20,
  fontWeight: 700,
  color: dark ? '#f3f4f6' : '#18181b',
});
const checkoutBtn = (dark) => ({
  background: dark ? '#2563eb' : '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '14px 32px',
  fontWeight: 700,
  fontSize: 16,
  boxShadow: dark ? '0 2px 8px rgba(37,99,235,0.18)' : '0 2px 8px rgba(37,99,235,0.10)',
  cursor: 'pointer',
  transition: 'background 0.2s',
});
const empty = (dark) => ({
  color: dark ? '#60a5fa' : '#2563eb',
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 500,
  margin: '40px 0',
});

export default function Cart() {
  const { language, currency, currencySymbols } = useGlobalSettings();
  const { dark } = useContext(ThemeContext);
  // ...existing code...
  // Simple currency conversion rates (for demo)
  const rates = { INR: 1, USD: 0.012, EUR: 0.011 };
  const convert = (amount) => (amount * rates[currency]).toFixed(2);
  // Translations
  const t = {
    en: {
      cart: "Shopping Cart",
      empty: "Your cart is empty.",
      product: "Product",
      price: "Price",
      qty: "Qty",
      total: "Total",
      remove: "Remove",
      coupon: "Coupon code",
      apply: "Apply",
      discount: "discount",
      placeOrder: "Place Order",
    },
    hi: {
      cart: "शॉपिंग कार्ट",
      empty: "आपकी कार्ट खाली है।",
      product: "उत्पाद",
      price: "मूल्य",
      qty: "मात्रा",
      total: "कुल",
      remove: "हटाएं",
      coupon: "कूपन कोड",
      apply: "लागू करें",
      discount: "छूट",
      placeOrder: "ऑर्डर करें",
    }
  };
  const { cart, removeFromCart, updateQty, clearCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  // Use discountedPrice if available
  const total = cart.reduce((sum, item) => {
    const price = item.discountedPrice ?? item.price;
    return sum + price * item.qty;
  }, 0);
  const discountedTotal = Math.max(0, total - discount);

  const handleRemove = (id) => {
    removeFromCart(id);
    showToast("Removed from cart", "info");
  };
  const handleQty = (id, qty) => {
    updateQty(id, qty);
    showToast("Quantity updated", "info");
  };
  const handleCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(10 * cart.length);
      showToast("Coupon applied! ₹10 off per item", "success");
    } else if (coupon) {
      setDiscount(0);
      showToast("Invalid coupon code", "error");
    }
  };
  const handleCheckout = () => {
    showToast("Proceeding to payment", "success");
    navigate("/payment");
  };

  const handleClearCart = () => {
    clearCart();
    showToast(language === "hi" ? "कार्ट साफ़ कर दी गई" : "Cart cleared", "info");
  };

  return (
    <div style={container(dark)}>
      <h2 style={title(dark)}>{t[language].cart}</h2>
      {cart.length === 0 ? (
        <div style={empty(dark)}>{t[language].empty}</div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <button onClick={handleClearCart} style={{ ...checkoutBtn(dark), background: '#ef4444', marginRight: 0, padding: '10px 22px' }}>
              {language === "hi" ? "कार्ट साफ़ करें" : "Clear Cart"}
            </button>
          </div>
          <table style={table(dark)}>
            <thead>
              <tr>
                <th style={th(dark)}>{t[language].product}</th>
                <th style={th(dark)}>{t[language].price}</th>
                <th style={th(dark)}>{t[language].qty}</th>
                <th style={th(dark)}>{t[language].total}</th>
                <th style={th(dark)}></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td style={td(dark)}>
                    <div style={{display:'flex',alignItems:'center'}}>
                      <img src={item.image} alt={item.name} style={img} />
                      <span style={{ color: dark ? '#f3f4f6' : '#18181b' }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={td(dark)}>
                    {item.discountedPrice ? (
                      <>
                        <span style={{ textDecoration: 'line-through', color: '#ef4444', marginRight: 6 }}>{currencySymbols[currency]}{convert(item.price)}</span>
                        <span style={{ color: '#22c55e', fontWeight: 700 }}>{currencySymbols[currency]}{convert(item.discountedPrice)}</span>
                        <span style={{ color: '#2563eb', marginLeft: 6 }}>({item.discountPercent}% OFF)</span>
                      </>
                    ) : (
                      <>{currencySymbols[currency]}{convert(item.price)}</>
                    )}
                  </td>
                  <td style={td(dark)}>
                    <button onClick={() => handleQty(item.id, item.qty - 1)} style={qtyBtn(dark)}>-</button>
                    <span style={{ color: dark ? '#f3f4f6' : '#18181b' }}>{item.qty}</span>
                    <button onClick={() => handleQty(item.id, item.qty + 1)} style={qtyBtn(dark)}>+</button>
                  </td>
                  <td style={td(dark)}>
                    {item.discountedPrice ? (
                      <>
                        <span style={{ textDecoration: 'line-through', color: '#ef4444', marginRight: 6 }}>{currencySymbols[currency]}{convert(item.price * item.qty)}</span>
                        <span style={{ color: '#22c55e', fontWeight: 700 }}>{currencySymbols[currency]}{convert(item.discountedPrice * item.qty)}</span>
                      </>
                    ) : (
                      <>{currencySymbols[currency]}{convert(item.price * item.qty)}</>
                    )}
                  </td>
                  <td style={td(dark)}>
                    <button onClick={() => handleRemove(item.id)} style={removeBtn(dark)}>{t[language].remove}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Coupon UI */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <input
              type="text"
              placeholder={t[language].coupon}
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              style={{
                border: dark ? '1px solid #334155' : '1px solid #bfdbfe',
                borderRadius: 8,
                padding: '10px 16px',
                fontSize: 16,
                minWidth: 180,
                background: dark ? '#23232a' : '#fff',
                color: dark ? '#f3f4f6' : '#18181b',
              }}
            />
            <button onClick={handleCoupon} style={{ ...checkoutBtn(dark), padding: '10px 18px', fontSize: 15 }}>{t[language].apply}</button>
            {discount > 0 && <span style={{ color: dark ? '#4ade80' : '#22c55e', fontWeight: 600 }}>-{currencySymbols[currency]}{convert(discount)} {t[language].discount}</span>}
          </div>
          <div style={totalRow}>
            <span style={totalText(dark)}>{t[language].total}: <span style={discount > 0 ? {textDecoration:'line-through',color:'#ef4444'} : { color: dark ? '#f3f4f6' : '#18181b' }}>{currencySymbols[currency]}{convert(total)}</span> {discount > 0 && <span style={{color: dark ? '#4ade80' : '#22c55e'}}>{currencySymbols[currency]}{convert(discountedTotal)}</span>}</span>
            <button onClick={handleCheckout}
              style={checkoutBtn(dark)}>
              {t[language].placeOrder}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
