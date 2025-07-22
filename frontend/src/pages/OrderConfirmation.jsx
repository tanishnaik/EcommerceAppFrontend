import React from "react";
import { useGlobalSettings } from "../components/GlobalSettingsContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const { language, currency, currencySymbols } = useGlobalSettings();
  // Simple currency conversion rates (for demo)
  const rates = { INR: 1, USD: 0.012, EUR: 0.011 };
  const convert = (amount) => (amount * rates[currency]).toFixed(2);
  // Translations
  const t = {
    en: {
      noOrder: "No order found.",
      goHome: "Go Home",
      orderPlaced: "Order Placed Successfully!",
      thankYou: "Thank you, ",
      delivery: "Your order will be delivered to:",
      paymentMethod: "Payment Method:",
      backHome: "Back to Home",
    },
    hi: {
      noOrder: "कोई ऑर्डर नहीं मिला।",
      goHome: "होम जाएं",
      orderPlaced: "ऑर्डर सफलतापूर्वक किया गया!",
      thankYou: "धन्यवाद, ",
      delivery: "आपका ऑर्डर यहाँ डिलीवर होगा:",
      paymentMethod: "भुगतान विधि:",
      backHome: "होम पर वापस जाएं",
    }
  };
  const location = useLocation();
  const navigate = useNavigate();
  const { form, cart } = location.state || {};

  if (!form) {
    return (
      <div style={{maxWidth: 520, margin: '80px auto', padding: 32, textAlign: 'center'}}>
        <h2 style={{fontSize: 28, fontWeight: 800, color: '#2563eb', marginBottom: 18}}>{t[language].noOrder}</h2>
        <button
          onClick={() => navigate("/")}
          style={{color: '#2563eb', textDecoration: 'underline', fontWeight: 700, fontSize: 17, background: 'none', border: 'none', cursor: 'pointer'}}
        >{t[language].goHome}</button>
      </div>
    );
  }

  // Calculate total using discountedPrice if available
  let total = 0;
  if (cart && Array.isArray(cart)) {
    total = cart.reduce((sum, item) => {
      const price = item.discountedPrice ?? item.price;
      return sum + price * item.qty;
    }, 0);
  }
  return (
    <div style={{maxWidth: 480, margin: '80px auto', padding: '32px 16px', textAlign: 'center'}}>
      <div style={{fontSize: 38, marginBottom: 18}}>🎉</div>
      <h2 style={{fontSize: 32, fontWeight: 900, color: '#22c55e', marginBottom: 18, letterSpacing: -1}}>{t[language].orderPlaced}</h2>
      <div style={{background: '#fff', borderRadius: 22, boxShadow: '0 4px 32px rgba(37,99,235,0.10)', padding: 32, marginBottom: 32, display: 'inline-block', minWidth: 320}}>
        <div style={{fontSize: 18, marginBottom: 8}}>{t[language].thankYou}<span style={{fontWeight: 700, color: '#2563eb'}}>{form.name}</span>!</div>
        <div style={{fontSize: 16, color: '#555', marginBottom: 8}}>{t[language].delivery}</div>
        <div style={{fontWeight: 600, color: '#18181b', marginBottom: 8}}>{form.address}</div>
        <div style={{fontSize: 16, color: '#555', marginBottom: 8}}>{t[language].paymentMethod} <span style={{textTransform: 'capitalize', color: '#2563eb', fontWeight: 600}}>{form.payment}</span></div>
        {/* Order summary */}
        {cart && cart.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Order Summary</h4>
            <table style={{ width: '100%', marginBottom: 8 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Product</th>
                  <th style={{ textAlign: 'right' }}>Price</th>
                  <th style={{ textAlign: 'right' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td style={{ textAlign: 'right' }}>
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
                    <td style={{ textAlign: 'right' }}>{item.qty}</td>
                    <td style={{ textAlign: 'right' }}>
                      {item.discountedPrice ? (
                        <>
                          <span style={{ textDecoration: 'line-through', color: '#ef4444', marginRight: 6 }}>{currencySymbols[currency]}{convert(item.price * item.qty)}</span>
                          <span style={{ color: '#22c55e', fontWeight: 700 }}>{currencySymbols[currency]}{convert(item.discountedPrice * item.qty)}</span>
                        </>
                      ) : (
                        <>{currencySymbols[currency]}{convert(item.price * item.qty)}</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'right', fontWeight: 700, fontSize: 16 }}>
              Total: {currencySymbols[currency]}{convert(total)}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => navigate("/")}
        style={{background: '#2563eb', color: '#fff', padding: '14px 38px', borderRadius: 12, fontWeight: 800, fontSize: 18, boxShadow: '0 2px 8px rgba(37,99,235,0.10)', border: 'none', cursor: 'pointer', transition: 'background 0.2s'}}
      >{t[language].backHome}</button>
    </div>
  );
}
