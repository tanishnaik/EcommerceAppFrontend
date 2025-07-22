import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const aiName = "AI Assistant";
const aiAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"; // Optional avatar

const CustomerSupport = () => {
  const { dark } = useContext(ThemeContext);
  const [messages, setMessages] = React.useState([
    { from: "ai", text: "Hi! I'm your AI assistant. How can I help you today?", time: new Date() }
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    // Scroll to bottom on new message
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const userMsg = { from: "user", text: input, time: new Date() };
    setMessages(msgs => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const aiMsg = { from: "ai", text: aiReply(userMsg.text), time: new Date() };
      setMessages(msgs => [...msgs, aiMsg]);
      setLoading(false);
    }, 900);
  };

  function aiReply(text) {
    const lower = text.toLowerCase();
    if (/return|refund|replace/.test(lower)) {
      return "To return a product, go to 'My Orders' and click 'Return Item'. Need help?";
    }
    if (/order|track/.test(lower)) {
      return "You can track your order in the 'My Orders' section.";
    }
    if (/hello|hi|hey/.test(lower)) {
      return "Hello! How can I assist you today?";
    }
    if (/cancel/.test(lower)) {
      return "To cancel an order, visit 'My Orders' and select 'Cancel'.";
    }
    if (/contact|support|help/.test(lower)) {
      return "I'm here to help! Ask me anything about your orders, returns, or products.";
    }
    if (/product|available|have|list/.test(lower)) {
      return "You can browse all products on our homepage or use the search bar above.";
    }
    return "I'm here to help with orders, returns, and more!";
  }


  // Inline styles with dark theme support
  const root = {
    minHeight: "100vh",
    background: dark ? "#18181b" : "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
    color: dark ? "#f3f4f6" : "#18181b",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 0 40px 0",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  };
  const chatBox = {
    width: "100%",
    maxWidth: 420,
    background: dark ? "#23232a" : "#fff",
    borderRadius: 18,
    boxShadow: dark ? "0 4px 24px #00000044" : "0 4px 24px #2563eb22",
    margin: "32px 0 0 0",
    display: "flex",
    flexDirection: "column",
    minHeight: 480,
    height: "70vh",
    maxHeight: 600,
    overflow: "hidden",
  };
  const header = {
    background: dark ? "#23232a" : "#2563eb",
    color: "#fff",
    padding: "18px 24px",
    fontWeight: 700,
    fontSize: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    display: "flex",
    alignItems: "center",
    gap: 12,
  };
  const avatar = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: dark ? "#23232a" : "#fff",
    objectFit: "cover",
    border: dark ? "2px solid #23232a" : "2px solid #fff",
    boxShadow: dark ? "0 1px 4px #00000044" : "0 1px 4px #2563eb33",
  };
  const messagesArea = {
    flex: 1,
    padding: "18px 12px 12px 12px",
    overflowY: "auto",
    background: dark ? "#23232a" : "#f3f4f6",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  };
  const msgRow = from => ({
    display: "flex",
    flexDirection: from === "user" ? "row-reverse" : "row",
    alignItems: "flex-end",
    gap: 8,
  });
  const msgBubble = from => ({
    background: from === "user"
      ? (dark ? "#2563eb" : "#2563eb")
      : (dark ? "#23232a" : "#e0e7ff"),
    color: from === "user"
      ? "#fff"
      : (dark ? "#f3f4f6" : "#18181b"),
    borderRadius: from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
    padding: "10px 16px",
    fontSize: 15,
    maxWidth: "75%",
    boxShadow: from === "user"
      ? (dark ? "0 1px 4px #2563eb88" : "0 1px 4px #2563eb44")
      : (dark ? "0 1px 4px #00000044" : "0 1px 4px #2563eb22"),
    wordBreak: "break-word",
    marginBottom: 2,
  });
  const timeStyle = {
    fontSize: 11,
    color: dark ? "#a1a1aa" : "#64748b",
    margin: from => (from === "user" ? "0 8px 0 0" : "0 0 0 8px"),
    alignSelf: "flex-end",
  };
  const inputRow = {
    display: "flex",
    alignItems: "center",
    padding: "12px 12px 12px 12px",
    background: dark ? "#23232a" : "#fff",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderTop: dark ? "1px solid #444" : "1px solid #e5e7eb",
    gap: 8,
  };
  const inputBox = {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 8,
    border: dark ? "1.5px solid #444" : "1.5px solid #2563eb55",
    fontSize: 15,
    outline: "none",
    background: dark ? "#18181b" : "#f8fafc",
    color: dark ? "#f3f4f6" : "#18181b",
  };
  const sendBtn = {
    background: loading ? (dark ? "#334155" : "#a5b4fc") : "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    fontWeight: 700,
    fontSize: 15,
    cursor: loading ? "not-allowed" : "pointer",
    transition: "background 0.2s, color 0.2s",
  };
  const typingStyle = {
    fontStyle: "italic",
    color: dark ? "#a1a1aa" : "#64748b",
    fontSize: 14,
    margin: "6px 0 0 8px",
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center",
    gap: 6,
  };

  // Responsive
  const responsive = {
    width: "100%",
    maxWidth: 480,
    minWidth: 0,
  };

  function formatTime(date) {
    if (!(date instanceof Date)) date = new Date(date);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div style={root}>
      <div style={{ ...chatBox, ...responsive }}>
        <div style={header}>
          <img src={aiAvatar} alt="AI" style={avatar} />
          <span>{aiName} - Customer Support</span>
        </div>
        <div style={messagesArea}>
          {messages.map((msg, i) => (
            <div key={i} style={msgRow(msg.from)}>
              {msg.from === "ai" && <img src={aiAvatar} alt="AI" style={{ ...avatar, width: 24, height: 24 }} />}
              <div>
                <div style={msgBubble(msg.from)}>{msg.text}</div>
                <div style={timeStyle}>{formatTime(msg.time)}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={msgRow("ai")}> 
              <img src={aiAvatar} alt="AI" style={{ ...avatar, width: 24, height: 24 }} />
              <div style={typingStyle}>
                <span>AI is typing</span>
                <span style={{ display: "inline-block", width: 18 }}>
                  <span style={{ animation: "blink 1s infinite" }}>.</span>
                  <span style={{ animation: "blink 1.2s infinite" }}>.</span>
                  <span style={{ animation: "blink 1.4s infinite" }}>.</span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div style={inputRow}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={inputBox}
            placeholder="Type your message..."
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            aria-label="Type your message"
            disabled={loading}
          />
          <button onClick={handleSend} style={sendBtn} disabled={loading}>Send</button>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .chatBox { max-width: 100vw !important; min-width: 0 !important; }
        }
        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default CustomerSupport;
