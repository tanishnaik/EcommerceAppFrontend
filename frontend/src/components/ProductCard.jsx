import React, { useContext, useState } from "react";
import { useGlobalSettings } from "./GlobalSettingsContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { RecentlyViewedContext } from "../context/RecentlyViewedContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onAddToCart, cardStyle, btnStyle, onQuickView, addToCartBtnStyle, goToCartBtnStyle }) {
  const { language, currency, currencySymbols } = useGlobalSettings();
  // Simple currency conversion rates (for demo)
  const rates = { INR: 1, USD: 0.012, EUR: 0.011 };
  const convert = (amount) => (amount * rates[currency]).toFixed(2);
  // Translations
  const t = {
    en: {
      outOfStock: "Out of Stock",
      goToCart: "Go to Cart",
      addToCart: "Add to Cart",
      compared: "✓ Compared",
      compare: "Compare",
      quickView: "Quick View",
      reviews: "reviews",
      category: product.category,
      description: product.description?.slice(0, 60) + "...",
    },
    hi: {
      outOfStock: "स्टॉक समाप्त",
      goToCart: "कार्ट देखें",
      addToCart: "कार्ट में जोड़ें",
      compared: "✓ तुलना की गई",
      compare: "तुलना करें",
      quickView: "त्वरित दृश्य",
      reviews: "समीक्षाएँ",
      category: product.category === "Fashion" ? "फैशन" : product.category === "Electronics" ? "इलेक्ट्रॉनिक्स" : product.category,
      description: product.description?.slice(0, 60) + "...",
    }
  };
  const { cart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addRecentlyViewed } = useContext(RecentlyViewedContext);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const inCart = cart.some((item) => item.id === product.id);
  const inWishlist = wishlist.some((item) => item.id === product.id);
  const isOutOfStock = product.stock === 0;
  // Star rating: product.rating (1-5), product.reviews (number)
  const imgStyle = {
    height: 160,
    width: 160,
    objectFit: 'cover',
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: '0 1px 6px rgba(37,99,235,0.10)',
    position: 'relative',
    cursor: 'pointer',
  };
  const name = {
    fontSize: 20,
    fontWeight: 700,
    color: '#1e40af',
    marginBottom: 8,
    textAlign: 'center',
  };
  const cat = {
    color: '#2563eb',
    marginBottom: 6,
    fontWeight: 500,
    fontSize: 15,
  };
  const desc = {
    color: '#222',
    marginBottom: 12,
    fontSize: 15,
    textAlign: 'center',
    minHeight: 36,
  };
  const price = {
    fontSize: 18,
    fontWeight: 700,
    color: '#1e40af',
    marginBottom: 12,
  };
  const goCartBtn = {
    ...(goToCartBtnStyle || addToCartBtnStyle || btnStyle),
    opacity: isOutOfStock ? 0.5 : 1,
    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
    marginTop: 12,
  };
  const wishlistBtn = {
    position: 'absolute',
    top: 10,
    right: 10,
    background: inWishlist ? '#2563eb' : '#fff',
    color: inWishlist ? '#fff' : '#2563eb',
    border: '1.5px solid #2563eb',
    borderRadius: '50%',
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    boxShadow: '0 1px 4px rgba(37,99,235,0.10)',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'background 0.2s, color 0.2s',
  };
  const badge = {
    position: 'absolute',
    top: 10,
    left: 10,
    background: '#ef4444',
    color: '#fff',
    borderRadius: 8,
    padding: '2px 10px',
    fontWeight: 700,
    fontSize: 13,
    zIndex: 2,
  };
  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
    justifyContent: 'center',
  };
  const quickViewBtn = {
    marginTop: 8,
    background: '#f0f6ff',
    color: '#2563eb',
    border: '1px solid #2563eb',
    borderRadius: 8,
    padding: '6px 14px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'background 0.2s',
    outline: 'none',
  };

  // Render stars
  const renderStars = (rating = 0) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < rating ? '#facc15' : '#d1d5db', fontSize: 16 }}>&#9733;</span>
    ));
  };

  // Compare logic
  const [compareList, setCompareList] = useState(() => {
    return JSON.parse(localStorage.getItem('compareList') || '[]');
  });
  const inCompare = compareList.some((item) => item.id === product.id);
  const addToCompare = (product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      const updated = [...prev, product].slice(-4); // max 4
      localStorage.setItem('compareList', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div style={{...cardStyle, position: 'relative'}} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Wishlist Button */}
      <button
        style={wishlistBtn}
        onClick={e => {
          e.stopPropagation();
          inWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
        }}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {inWishlist ? '♥' : '♡'}
      </button>
      {/* Out of Stock Badge */}
      {isOutOfStock && <div style={badge}>{t[language].outOfStock}</div>}
      {/* Product Image (Quick View on click) */}
      <img
        src={product.image}
        alt={product.name}
        style={imgStyle}
        onClick={() => {
          addRecentlyViewed(product);
          onQuickView && onQuickView(product);
        }}
      />
      <h3 style={name}>{product.name}</h3>
      <p style={cat}>{t[language].category}</p>
      <div style={ratingStyle}>
        {renderStars(product.rating)}
        <span style={{ color: '#6b7280', fontSize: 14, marginLeft: 4 }}>
          ({product.reviews || 0} {t[language].reviews})
        </span>
      </div>
      <p style={desc}>{t[language].description}</p>
      {product.discountedPrice ? (
        <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>
          <span style={{ textDecoration: 'line-through', color: '#ef4444', marginRight: 8 }}>{currencySymbols[currency]}{convert(product.price)}</span>
          <span style={{ color: '#22c55e', fontWeight: 700 }}>{currencySymbols[currency]}{convert(product.discountedPrice)}</span>
          <span style={{ color: '#2563eb', marginLeft: 8 }}>({product.discountPercent}% OFF)</span>
        </div>
      ) : (
        <span style={price}>{currencySymbols[currency]}{convert(product.price)}</span>
      )}
      {inCart ? (
        <button onClick={() => navigate('/cart')} style={{ ...goCartBtn, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Cart" style={{height:18, width:18, marginRight:2, verticalAlign:'middle'}} />
          {t[language].goToCart}
        </button>
      ) : (
        <button
          onClick={() => !isOutOfStock && onAddToCart(product)}
          style={{ ...(addToCartBtnStyle || btnStyle), opacity: isOutOfStock ? 0.5 : 1, cursor: isOutOfStock ? 'not-allowed' : 'pointer', marginTop: 12, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}
          disabled={isOutOfStock}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Add to Cart" style={{height:18, width:18, marginRight:2, verticalAlign:'middle'}} />
          {t[language].addToCart}
        </button>
      )}
      {/* Compare Button */}
      <button
        onClick={() => {
          if (!inCompare) {
            addToCompare(product);
            setTimeout(() => navigate('/compare'), 100); // ensure state update
          } else {
            navigate('/compare');
          }
        }}
        style={{
          marginTop: 8,
          background: inCompare ? '#e0e7ef' : '#2563eb',
          color: inCompare ? '#888' : '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '6px 14px',
          fontWeight: 700,
          fontSize: 15,
          cursor: inCompare ? 'not-allowed' : 'pointer',
          opacity: inCompare ? 0.6 : 1,
          width: '100%',
          transition: 'background 0.2s',
          display:'flex', alignItems:'center', justifyContent:'center', gap:6
        }}
        disabled={inCompare}
        title={inCompare ? t[language].compared : t[language].compare}
      >
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Compare" style={{height:18, width:18, marginRight:2, verticalAlign:'middle'}} />
        {inCompare ? t[language].compared : t[language].compare}
      </button>
      {/* Quick View Button */}
      {hovered && (
        <button
          style={quickViewBtn}
          onClick={() => {
            addRecentlyViewed(product);
            onQuickView && onQuickView(product);
          }}
        >{t[language].quickView}</button>
      )}
    </div>
  );
}
