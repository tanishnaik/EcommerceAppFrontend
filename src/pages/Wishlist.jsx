import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const pageStyle = {
  maxWidth: 1200,
  margin: "40px auto 0 auto",
  padding: 24,
};
const titleStyle = {
  fontSize: 28,
  fontWeight: 800,
  color: "#1e40af",
  marginBottom: 32,
  textAlign: "center",
};
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 32,
};
const emptyStyle = {
  textAlign: "center",
  color: "#6b7280",
  fontSize: 18,
  marginTop: 60,
};

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  // Filter out invalid products
  const validWishlist = Array.isArray(wishlist)
    ? wishlist.filter(
        (p) => p && typeof p === 'object' && typeof p.id !== 'undefined' && typeof p.name === 'string'
      )
    : [];
  const hasInvalid = Array.isArray(wishlist) && wishlist.length !== validWishlist.length;

  // Auto-cleanup: if invalid, remove from localStorage
  React.useEffect(() => {
    if (hasInvalid) {
      localStorage.setItem('wishlist', JSON.stringify(validWishlist));
    }
  }, [hasInvalid]);

  // Manual clear for user if still broken
  const handleClearWishlist = () => {
    localStorage.removeItem('wishlist');
    window.location.reload();
  };

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>My Wishlist</h2>
      {hasInvalid && (
        <div style={{ color: 'red', marginBottom: 16 }}>
          Some invalid items were found and removed from your wishlist. If you still see issues, <button onClick={handleClearWishlist} style={{color:'#fff',background:'#ef4444',border:'none',borderRadius:6,padding:'4px 10px',cursor:'pointer'}}>Clear Wishlist</button>
        </div>
      )}
      {validWishlist.length === 0 ? (
        <div style={emptyStyle}>Your wishlist is empty.</div>
      ) : (
        <div style={gridStyle}>
          {validWishlist.map((product) => (
            <div key={product.id} style={{ position: "relative" }}>
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                cardStyle={{
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 2px 12px rgba(37,99,235,0.08)",
                  padding: 24,
                  minHeight: 420,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
                btnStyle={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  marginTop: 12,
                  transition: "background 0.2s",
                }}
                onQuickView={() => {}}
              />
              <button
                onClick={() => removeFromWishlist(product.id)}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}
                title="Remove from wishlist"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
