import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ThemeContext } from "../context/ThemeContext";

// Main Navbar Component
const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [cartCount, setCartCount] = React.useState(cart.length);

  React.useEffect(() => {
    // Listen for cart changes in localStorage and context
    const handler = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(Array.isArray(stored) ? stored.length : 0);
      } catch {
        setCartCount(0);
      }
    };
    handler();
    window.addEventListener('storage', handler);
    const interval = setInterval(handler, 300);
    return () => {
      window.removeEventListener('storage', handler);
      clearInterval(interval);
    };
  }, [cart]);
  const { wishlist } = useContext(WishlistContext);
  const { dark = false, toggleTheme } = useContext(ThemeContext) || {};
  const [compareCount, setCompareCount] = React.useState(() => {
    return JSON.parse(localStorage.getItem('compareList') || '[]').length;
  });

  React.useEffect(() => {
    const handler = () => {
      setCompareCount(JSON.parse(localStorage.getItem('compareList') || '[]').length);
    };
    window.addEventListener('storage', handler);
    const interval = setInterval(handler, 300);
    return () => {
      window.removeEventListener('storage', handler);
      clearInterval(interval);
    };
  }, []);

  const navStyle = {
    background: dark ? "#121212" : "#f8fafc",
    color: dark ? "#f3f4f6" : "#18181b",
    padding: "18px 44px 14px 44px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.06)",
    borderBottom: dark ? "1.5px solid #23232a" : "1.5px solid #e5e7eb",
    transition: "background 0.3s, color 0.3s, border 0.3s",
  };

  const linkContainerStyle = {
    display: "flex",
    gap: "28px",
    alignItems: "center",
    background: dark ? "#18181b" : "#f3f4f6",
    borderRadius: 12,
    padding: "8px 18px",
    boxShadow: dark ? "0 1px 8px #0004" : "0 1px 8px #2563eb11",
    position: "relative",
  };

  const linkStyle = {
    color: dark ? "#f3f4f6" : "#2563eb",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 17,
    padding: "10px 18px",
    borderRadius: 10,
    background: dark ? "#23232a" : "#fff",
    boxShadow: dark ? "0 1px 8px #0006" : "0 1px 8px #2563eb11",
    border: dark ? "1.5px solid #23232a" : "1.5px solid #e0e7ff",
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  const badgeStyle = {
    position: "absolute",
    top: "-10px",
    right: "-12px",
    backgroundColor: dark ? "#60a5fa" : "#2563eb",
    color: dark ? "#18181b" : "#fff",
    borderRadius: "50%",
    padding: "2.5px 7px",
    fontSize: "13px",
    fontWeight: 800,
    boxShadow: dark ? "0 1px 4px #60a5fa88" : "0 1px 4px #2563eb33",
    border: dark ? "1.5px solid #23232a" : "1.5px solid #fff",
  };

  const themeBtnStyle = {
    background: dark ? "#23232a" : "#e0e7ff",
    color: dark ? "#fff" : "#18181b",
    border: dark ? "1.5px solid #23232a" : "1.5px solid #e0e7ff",
    borderRadius: 10,
    padding: "10px 18px",
    fontWeight: 800,
    fontSize: 17,
    marginLeft: 22,
    cursor: "pointer",
    boxShadow: dark ? "0 1px 8px #0006" : "0 1px 8px #2563eb11",
    transition: "background 0.2s, color 0.2s, border 0.2s",
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={{ ...linkStyle, fontSize: 22, fontWeight: 800 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/891/891419.png" alt="Shop Logo" style={{ height: 28, width: 28, marginRight: 8 }} />
          MyShop
        </Link>
      </div>
      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle}>🏠 Home</Link>
        <Link to="/cart" style={linkStyle}>
          <span style={{ position: 'relative', display: 'inline-block', marginRight: 6 }}>
            <span role="img" aria-label="cart" style={{ fontSize: 20 }}>🛒</span>
            {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
          </span>
          Cart
        </Link>
        <Link to="/wishlist" style={linkStyle}>
          <span style={{ position: 'relative', display: 'inline-block', marginRight: 6 }}>
            <span role="img" aria-label="wishlist" style={{ fontSize: 20 }}>❤️</span>
            {wishlist.length > 0 && <span style={badgeStyle}>{wishlist.length}</span>}
          </span>
          Wishlist
        </Link>
        <Link to="/compare" style={linkStyle}>
          <span style={{ position: 'relative', display: 'inline-block', marginRight: 6 }}>
            <span role="img" aria-label="compare" style={{ fontSize: 20 }}>📊</span>
            {compareCount > 0 && <span style={badgeStyle}>{compareCount}</span>}
          </span>
          Compare
        </Link>
        <Link to="/orders" style={linkStyle}>📦 Orders</Link>
        <Link to="/support" style={linkStyle}>📞 Support</Link>
        <button onClick={toggleTheme} style={themeBtnStyle}>
          {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
};

// ✅ Fixed Chatbot Component
function Chatbot() {
  const { dark = false } = useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([{ from: "bot", text: "Hi! How can I help you today?" }]);
  const [input, setInput] = React.useState("");
  const [lastIntent, setLastIntent] = React.useState(null);

  const allProducts = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("allProducts") || "[]");
    } catch {
      return [];
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(msgs => [...msgs, { from: "user", text: userMsg }]);
    setTimeout(() => {
      const { reply, intent } = aiReply(userMsg, lastIntent);
      setMessages(msgs => [...msgs, { from: "bot", text: reply }]);
      setLastIntent(intent);
    }, 600);
    setInput("");
  };

  function aiReply(text, prevIntent) {
    const lower = text.toLowerCase();
    if (/\b(hi|hello|hey)\b/.test(lower)) {
      return { reply: "Hello! 👋 How can I assist you? You can ask about products, compare, cart, or more.", intent: "greeted" };
    }
    if (/product|available|have|list|show.*product|what.*sell/.test(lower)) {
      if (allProducts.length === 0) return { reply: "No products available right now.", intent: "asked_products" };
      const names = allProducts.slice(0, 5).map(p => `• ${p.name} (₹${p.price})`).join("\n");
      return { reply: `Some products:\n${names}`, intent: "listed_products" };
    }
    if (/compare|which.*better|cheapest|price/.test(lower)) {
      return { reply: "You can use the Compare page to check product differences.", intent: "compare" };
    }
    if (/cart|add|checkout/.test(lower)) {
      return { reply: "Add items to cart and go to checkout from the Cart page.", intent: "cart" };
    }
    if (/wishlist/.test(lower)) {
      return { reply: "Click the ❤️ icon to add items to your Wishlist.", intent: "wishlist" };
    }
    if (/return|refund/.test(lower)) {
      return { reply: "Go to Orders page or Support to request returns.", intent: "returns" };
    }
    if (/dark|light|theme/.test(lower)) {
      return { reply: "You can toggle between dark/light mode using the button in navbar.", intent: "theme" };
    }
    if (prevIntent === "greeted") {
      return { reply: "You can ask about available products, comparing items, or more!", intent: null };
    }
    return { reply: "I'm a simple assistant. Ask me about products, cart, or compare features.", intent: null };
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 9999,
          background: "#60a5fa",
          color: "#18181b",
          border: "none",
          borderRadius: "50%",
          width: 56,
          height: 56,
          fontSize: 28,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 2px 12px #60a5fa55",
        }}
        title={open ? "Close chatbot" : "Open chatbot"}
      >
        🤖
      </button>
      {open && (
        <div style={{
          position: "fixed", bottom: 90, right: 32, width: 340, background: dark ? "#18181b" : "#fff",
          color: dark ? "#f3f4f6" : "#18181b", borderRadius: 18, boxShadow: "0 4px 24px rgba(0,0,0,0.15)", zIndex: 9999,
          display: "flex", flexDirection: "column", overflow: "hidden", border: dark ? "1.5px solid #23232a" : "1.5px solid #e0e7ff"
        }}>
          <div style={{ padding: 16, fontWeight: "bold", background: dark ? "#23232a" : "#e0e7ff", color: dark ? "#60a5fa" : "#2563eb" }}>
            AI Chatbot
          </div>
          <div style={{ padding: 18, maxHeight: 260, overflowY: "auto", background: dark ? "#18181b" : "#fff" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                background: msg.from === "user" ? (dark ? "#60a5fa" : "#2563eb") : (dark ? "#23232a" : "#e0e7ff"),
                color: msg.from === "user" ? (dark ? "#18181b" : "#fff") : (dark ? "#f3f4f6" : "#2563eb"),
                borderRadius: 12, padding: "10px 14px", marginBottom: 10, alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%", fontSize: 15, fontWeight: 600
              }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ padding: 12, background: dark ? "#23232a" : "#f3f4f6", display: "flex", gap: 10 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              style={{
                flex: 1, borderRadius: 10, border: `1.5px solid ${dark ? "#60a5fa" : "#2563eb"}`, padding: "10px 14px",
                background: dark ? "#18181b" : "#fff", color: dark ? "#f3f4f6" : "#18181b"
              }}
            />
            <button onClick={handleSend} style={{
              padding: "10px 16px", fontWeight: 800, background: dark ? "#60a5fa" : "#2563eb", color: "#fff",
              border: "none", borderRadius: 10, cursor: "pointer"
            }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

// Wrapper Export
const NavbarWithChatbot = () => (
  <>
    <Navbar />
    <Chatbot />
  </>
);

export default NavbarWithChatbot;
