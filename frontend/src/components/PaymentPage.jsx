import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useGlobalSettings } from "./GlobalSettingsContext";
import { useNavigate } from "react-router-dom";

const DUMMY_QR = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=DummyPayment";
const DUMMY_AMOUNT = 499;

const PaymentPage = ({ products = [], amount = DUMMY_AMOUNT }) => {
  const { language, currency, currencySymbols } = useGlobalSettings();
  // Simple currency conversion rates (for demo)
  const rates = { INR: 1, USD: 0.012, EUR: 0.011 };
  const convert = (amount) => (amount * rates[currency]).toFixed(2);
  // Translations
  const t = {
    en: {
      makePayment: "Make a Payment",
      scanQR: "Scan QR",
      enterCode: "Enter Code",
      selectCoupon: "Select Coupon:",
      scanToPay: "Scan to Pay",
      amount: "Amount:",
      applied: "Applied",
      pay: "Pay",
      processing: "Processing Payment...",
      pleaseWait: "Please wait",
      paymentSuccess: "Payment Successful",
      thankYou: "Thank you for your payment!",
      amountPaid: "Amount Paid:",
      orderId: "Order ID:",
      redirecting: "Redirecting to order confirmation...",
      outOfStock: "Out of Stock",
    },
    hi: {
      makePayment: "भुगतान करें",
      scanQR: "QR स्कैन करें",
      enterCode: "कोड दर्ज करें",
      selectCoupon: "कूपन चुनें:",
      scanToPay: "भुगतान के लिए स्कैन करें",
      amount: "राशि:",
      applied: "लागू",
      pay: "भुगतान करें",
      processing: "भुगतान प्रक्रिया...",
      pleaseWait: "कृपया प्रतीक्षा करें",
      paymentSuccess: "भुगतान सफल",
      thankYou: "आपके भुगतान के लिए धन्यवाद!",
      amountPaid: "भुगतान की गई राशि:",
      orderId: "ऑर्डर आईडी:",
      redirecting: "ऑर्डर पुष्टिकरण पर जा रहे हैं...",
      outOfStock: "स्टॉक समाप्त",
    }
  };
  const [mode, setMode] = React.useState("qr");
  const [selectedCoupon, setSelectedCoupon] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");
  const [discountedAmount, setDiscountedAmount] = React.useState(amount);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (success) {
      const newOrderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(newOrderId);
      // Save order to localStorage orderHistory
      const order = {
        orderId: newOrderId,
        date: new Date().toISOString(),
        amount: discountedAmount,
        products,
        form: {
          name: "Customer",
          address: "Your saved address",
          payment: mode === "qr" ? "qr code" : "code",
        }
      };
      try {
        const prev = JSON.parse(localStorage.getItem("orderHistory") || "[]");
        localStorage.setItem("orderHistory", JSON.stringify([order, ...prev]));
      } catch {}
      setTimeout(() => {
        navigate("/order-confirmation", {
          state: {
            form: {
              name: "Customer",
              address: "Your saved address",
              payment: mode === "qr" ? "qr code" : "code",
              orderId: newOrderId,
              amount: discountedAmount
            }
          }
        });
      }, 1800);
    }
  }, [success, mode, amount, navigate, products]);

  // Coupon definitions
  const coupons = [
    { code: "", label: "No Coupon", discount: 0 },
    { code: "SAVE10", label: "SAVE10 - 10% OFF", discount: 10 },
    { code: "SAVE20", label: "SAVE20 - 20% OFF", discount: 20 },
    { code: "FASHION5", label: "FASHION5 - 5% OFF (Fashion Only)", discount: 5, category: "Fashion" },
  ];

  React.useEffect(() => {
    let discount = 0;
    let valid = false;
    const coupon = coupons.find(c => c.code === selectedCoupon);
    if (coupon) {
      // If coupon is category-specific, check products
      if (coupon.category) {
        valid = products.some(p => p.category === coupon.category);
      } else {
        valid = true;
      }
      if (valid) {
        discount = coupon.discount;
      }
    }
    const newAmount = Number((amount - (amount * (discount / 100))).toFixed(2));
    setDiscountedAmount(newAmount);
  }, [selectedCoupon, amount, products]);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2200);
  };

  const { dark } = useContext(ThemeContext);
  // Responsive root
  const root = {
    minHeight: "100vh",
    background: dark ? "#18181b" : "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    padding: "0 0 40px 0",
    position: "relative",
    overflow: "hidden",
    color: dark ? "#f3f4f6" : "#18181b",
  };
  const card = {
    width: "100%",
    maxWidth: 420,
    background: dark ? "#23232a" : "#fff",
    borderRadius: 18,
    boxShadow: dark ? "0 4px 24px #2563eb44" : "0 4px 24px #2563eb22",
    margin: "32px 0 0 0",
    display: "flex",
    flexDirection: "column",
    minHeight: 480,
    maxHeight: 700,
    overflow: "hidden",
    animation: "cardIn 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
    color: dark ? "#f3f4f6" : "#18181b",
  };
  const heading = {
    fontSize: 26,
    fontWeight: 800,
    color: dark ? "#60a5fa" : "#2563eb",
    textAlign: "center",
    margin: "32px 0 18px 0",
    letterSpacing: "-1px",
  };
  const tabRow = {
    display: "flex",
    justifyContent: "center",
    gap: 0,
    marginBottom: 24,
  };
  const tabBtn = active => ({
    background: active ? (dark ? "#2563eb" : "#2563eb") : (dark ? "#23232a" : "#e0e7ff"),
    color: active ? "#fff" : (dark ? "#60a5fa" : "#2563eb"),
    border: "none",
    borderRadius: active ? "10px 10px 0 0" : "10px 10px 0 0",
    padding: "12px 32px",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
    outline: "none",
  });
  const qrBox = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 0 24px 0",
  };
  const qrImg = {
    width: 180,
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
    boxShadow: dark ? "0 2px 12px #2563eb44" : "0 2px 12px #2563eb22",
    background: dark ? "#23232a" : "#f3f4f6",
    animation: mode === "qr" ? "qrBounce 0.7s" : undefined,
  };
  const label = {
    fontSize: 16,
    color: dark ? "#60a5fa" : "#2563eb",
    fontWeight: 600,
    marginBottom: 8,
    textAlign: "center",
  };
  const inputBox = {
    width: "90%",
    padding: "12px 16px",
    borderRadius: 8,
    border: dark ? "1.5px solid #334155" : "1.5px solid #2563eb55",
    fontSize: 16,
    outline: "none",
    background: dark ? "#23232a" : "#f8fafc",
    color: dark ? "#f3f4f6" : "#18181b",
    margin: "24px auto 0 auto",
    display: "block",
  };
  const payBtn = {
    background: dark ? "#2563eb" : "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "14px 0",
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    margin: "32px 0 0 0",
    width: "90%",
    transition: "background 0.2s, color 0.2s",
    boxShadow: dark ? "0 1px 4px #2563eb44" : "0 1px 4px #2563eb33",
    position: "relative",
    overflow: "hidden",
  };
  const loading = {
    textAlign: "center",
    color: dark ? "#60a5fa" : "#2563eb",
    fontWeight: 700,
    fontSize: 18,
    margin: "32px 0 0 0",
    letterSpacing: 1,
  };
  const successBox = {
    textAlign: "center",
    padding: "48px 24px 32px 24px",
    color: dark ? "#f3f4f6" : "#18181b",
  };
  const successIcon = {
    fontSize: 48,
    color: "#22c55e",
    marginBottom: 12,
    animation: "popIn 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
  };
  const orderRow = {
    fontSize: 16,
    color: dark ? "#60a5fa" : "#2563eb",
    fontWeight: 600,
    margin: "12px 0 0 0",
  };
  const backBtn = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px 32px",
    fontWeight: 700,
    fontSize: 16,
    marginTop: 32,
    cursor: "pointer",
    boxShadow: "0 1px 4px #2563eb33",
  };
  const prodList = {
    background: dark ? "#23232a" : "#f3f4f6",
    borderRadius: 12,
    padding: "18px 12px 12px 12px",
    margin: "0 0 18px 0",
    maxHeight: 180,
    overflowY: "auto",
    color: dark ? "#f3f4f6" : "#18181b",
  };
  const prodRow = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  };
  const prodImg = {
    width: 48,
    height: 48,
    borderRadius: 8,
    objectFit: "cover",
    background: dark ? "#18181b" : "#fff",
    boxShadow: dark ? "0 1px 4px #2563eb44" : "0 1px 4px #2563eb22",
  };
  const prodName = {
    fontWeight: 600,
    color: dark ? "#f3f4f6" : "#18181b",
    fontSize: 15,
    flex: 1,
  };
  const prodPrice = {
    color: dark ? "#60a5fa" : "#2563eb",
    fontWeight: 700,
    fontSize: 15,
  };

  // Responsive
  const responsive = {
    width: "100%",
    maxWidth: 480,
    minWidth: 0,
  };

  return (
    <div style={root}>
      {/* Animated floating shapes background */}
      <div style={{position:'absolute',zIndex:0,top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}>
        <div style={{position:'absolute',top:40,left:30,width:60,height:60,background:'rgba(37,99,235,0.10)',borderRadius:'50%',filter:'blur(2px)',animation:'float1 7s infinite alternate'}}></div>
        <div style={{position:'absolute',bottom:80,right:40,width:90,height:90,background:'rgba(34,197,94,0.10)',borderRadius:'50%',filter:'blur(2px)',animation:'float2 9s infinite alternate'}}></div>
        <div style={{position:'absolute',top:180,right:80,width:40,height:40,background:'rgba(255,193,7,0.10)',borderRadius:'50%',filter:'blur(2px)',animation:'float3 11s infinite alternate'}}></div>
      </div>
      <div style={{ ...card, ...responsive, zIndex:1 }}>
        <div style={heading}>{t[language].makePayment}</div>
        {/* Product details */}
        {products.length > 0 && (
          <div style={prodList}>
            {products.map((p, i) => (
              <div key={i} style={prodRow}>
                <img src={p.image} alt={p.name} style={prodImg} />
                <span style={prodName}>{p.name}</span>
                <span style={prodPrice}>{currencySymbols[currency]}{convert(p.price)} × {p.qty}</span>
              </div>
            ))}
          </div>
        )}
        {/* Payment options */}
        {!success && (
          <>
            <div style={tabRow}>
              <button style={tabBtn(mode === "qr")}
                onClick={() => setMode("qr")}>{t[language].scanQR}</button>
              <button style={tabBtn(mode === "code")}
                onClick={() => setMode("code")}>{t[language].enterCode}</button>
            </div>
            {/* Coupon selection */}
            <div style={{ margin: '18px 0', textAlign: 'center' }}>
              <label htmlFor="coupon-select" style={{ fontWeight: 600, color: '#2563eb', marginRight: 8 }}>{t[language].selectCoupon}</label>
              <select
                id="coupon-select"
                value={selectedCoupon}
                onChange={e => setSelectedCoupon(e.target.value)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #bfdbfe', fontSize: 16 }}
              >
                {coupons.map(c => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>
            <div style={qrBox}>
              <img src={DUMMY_QR} alt="QR Code" style={qrImg} />
              <div style={label}>{t[language].scanToPay}</div>
            </div>
            <div style={{ textAlign: "center", color: "#18181b", fontWeight: 600, fontSize: 16, marginTop: 8 }}>
              {t[language].amount} <span style={{ color: "#2563eb", fontWeight: 800 }}>{currencySymbols[currency]}{convert(discountedAmount)}</span>
              {selectedCoupon && (
                <span style={{ color: "#22c55e", fontWeight: 700, marginLeft: 8 }}>
                  ({selectedCoupon} {t[language].applied})
                </span>
              )}
            </div>
            <button
              style={payBtn}
              disabled={processing}
              onClick={handlePay}
            >
              {processing ? (
                <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                  <span className="shimmer-ball" style={{display:'inline-block',width:18,height:18,borderRadius:'50%',background:'#fff',boxShadow:'0 0 0 0 #fff',animation:'payPulse 1.1s infinite'}}></span>
                  {t[language].processing}
                </span>
              ) : t[language].pay}
            </button>
            {processing && <div style={loading}>{t[language].pleaseWait}<span style={{ animation: "blink 1s infinite" }}>...</span></div>}
          </>
        )}
        {success && (
          <div style={successBox}>
            <div style={successIcon}>✅</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#22c55e", marginBottom: 8 }}>{t[language].paymentSuccess}</div>
            <div style={{ color: "#18181b", fontSize: 16, marginBottom: 8 }}>{t[language].thankYou}</div>
            <div style={orderRow}>{t[language].amountPaid} <span style={{ color: "#2563eb" }}>{currencySymbols[currency]}{convert(discountedAmount)}</span></div>
            <div style={orderRow}>{t[language].orderId} <span style={{ color: "#18181b" }}>{orderId}</span></div>
            <div style={{ color: '#64748b', fontSize: 14, marginTop: 18 }}>{t[language].redirecting}</div>
          </div>
        )}
      </div>
      {/* Keyframes for loading animation and new animations */}
      <style>{`
        @media (max-width: 600px) {
          .card { max-width: 100vw !important; min-width: 0 !important; }
        }
        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        @keyframes cardIn {
          0% { opacity:0; transform: translateY(60px) scale(0.95); }
          60% { opacity:1; transform: translateY(-8px) scale(1.03); }
          100% { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes qrBounce {
          0% { opacity:0; transform: scale(0.7) rotate(-8deg); }
          60% { opacity:1; transform: scale(1.08) rotate(2deg); }
          100% { opacity:1; transform: scale(1) rotate(0); }
        }
        @keyframes popIn {
          0% { opacity:0; transform: scale(0.5); }
          60% { opacity:1; transform: scale(1.2); }
          100% { opacity:1; transform: scale(1); }
        }
        @keyframes payPulse {
          0% { box-shadow: 0 0 0 0 #fff8; }
          70% { box-shadow: 0 0 0 10px #fff0; }
          100% { box-shadow: 0 0 0 0 #fff0; }
        }
        @keyframes float1 {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(30px) scale(1.08); }
        }
        @keyframes float2 {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-24px) scale(1.04); }
        }
        @keyframes float3 {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(18px) scale(1.12); }
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;
