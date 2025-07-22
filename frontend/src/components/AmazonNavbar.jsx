import React from "react";

const logoSvg = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#232F3E"/>
    <text x="50%" y="55%" textAnchor="middle" fill="#FF9900" fontSize="22" fontWeight="bold" fontFamily="Arial" dy=".3em">🛒</text>
  </svg>
);

const AmazonNavbar = ({ cartCount = 0, onLogin }) => {
  const [search, setSearch] = React.useState("");
  return (
    <nav style={{
      background: "#232f3e",
      color: "#fff",
      padding: "0 24px",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 8px #0002"
    }}>
      {/* Logo */}
      <div style={{display: "flex", alignItems: "center", gap: 8}}>
        {logoSvg}
        <span style={{fontWeight: 900, fontSize: 26, color: "#FF9900", letterSpacing: -1, marginLeft: 4}}>ShopEasy</span>
      </div>
      {/* Search Bar */}
      <div style={{flex: 1, display: "flex", justifyContent: "center"}}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for products, brands and more"
          style={{
            width: 400,
            maxWidth: "90vw",
            padding: "10px 16px",
            borderRadius: 4,
            border: "none",
            fontSize: 16,
            outline: "none",
            boxShadow: "0 1px 4px #0001",
            marginRight: 8
          }}
        />
        <button style={{
          background: "#FF9900",
          color: "#232f3e",
          border: "none",
          borderRadius: 4,
          padding: "10px 18px",
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer"
        }}>Search</button>
      </div>
      {/* Cart & Login */}
      <div style={{display: "flex", alignItems: "center", gap: 18}}>
        <button style={{
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          position: "relative"
        }}>
          <span style={{fontSize: 22, marginRight: 4}}>🛒</span>
          Cart
          {cartCount > 0 && <span style={{position: "absolute", top: -8, right: -12, background: "#FF9900", color: "#232f3e", borderRadius: "50%", padding: "2px 7px", fontSize: 13, fontWeight: 700}}>{cartCount}</span>}
        </button>
        <button onClick={onLogin} style={{
          background: "#fff",
          color: "#232f3e",
          border: "none",
          borderRadius: 4,
          padding: "8px 18px",
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer"
        }}>Login</button>
      </div>
    </nav>
  );
};

export default AmazonNavbar;
