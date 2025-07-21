import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ARTryOn from "../components/ARTryOn";
import UnboxingAnimation from "../components/UnboxingAnimation";
import ProductScanner from "../components/ProductScanner";
import OutfitBuilder from "../components/OutfitBuilder";
import LightningDealTimer from "../components/LightningDealTimer";
import Product360Viewer from "../components/Product360Viewer";

const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    description: "High-quality sound, noise cancellation, 20h battery life."
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 4499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description: "Track fitness, heart rate, notifications, and more."
  },
  {
    id: 3,
    name: "Trendy Sneakers",
    price: 1799,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80",
    description: "Comfortable, stylish, and perfect for everyday wear."
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [dealExpired, setDealExpired] = useState(false);
  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div style={{maxWidth: 600, margin: '60px auto', textAlign: 'center'}}>
        <h2 style={{fontSize: 24, fontWeight: 700, color: '#2563eb', marginBottom: 16}}>Product Not Found</h2>
        <button onClick={() => navigate("/")} style={{color: '#2563eb', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer'}}>Go Home</button>
      </div>
    );
  }

  const container = {
    maxWidth: 800,
    margin: '40px auto',
    padding: 24,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 40,
    background: '#fff',
    borderRadius: 18,
    boxShadow: '0 4px 24px rgba(37,99,235,0.08)',
  };
  const imgStyle = {
    width: 320,
    height: 320,
    objectFit: 'cover',
    borderRadius: 16,
    boxShadow: '0 2px 12px rgba(37,99,235,0.10)',
    flex: '0 0 320px',
  };
  const info = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 220,
  };
  const name = {
    fontSize: 28,
    fontWeight: 700,
    color: '#1e40af',
    marginBottom: 12,
  };
  const cat = {
    color: '#2563eb',
    marginBottom: 8,
    fontWeight: 500,
  };
  const desc = {
    marginBottom: 18,
    color: '#222',
    fontSize: 16,
  };
  const price = {
    fontSize: 22,
    fontWeight: 700,
    color: '#1e40af',
    marginBottom: 18,
  };
  const btn = {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '14px 32px',
    fontWeight: 700,
    fontSize: 16,
    boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
    cursor: 'pointer',
    marginTop: 8,
    transition: 'background 0.2s',
  };

  // Demo images for 360 viewer
  const images360 = [
    product.image,
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80"
  ];
  // Demo overlay for AR Try On
  const overlayImg = "https://pngimg.com/uploads/sunglasses/sunglasses_PNG44.png";

  return (
    <div style={{paddingBottom: 40}}>
      <div style={container}>
        <div style={{display:'flex', flexDirection:'column', gap:18}}>
          {/* 360 Viewer */}
          <Product360Viewer images={images360} />
          {/* AR Try Before You Buy */}
          <ARTryOn productImage={product.image} overlayImage={overlayImg} />
          {/* Unboxing Animation */}
          <UnboxingAnimation productImage={product.image} />
        </div>
        <div style={info}>
          <h2 style={name}>{product.name}</h2>
          <p style={cat}>Category: {product.category}</p>
          <p style={desc}>{product.description}</p>
          <span style={price}>₹{product.price}</span>
          {/* Lightning Deal Timer */}
          {!dealExpired && (
            <LightningDealTimer endTime={Date.now() + 120000} onExpire={() => setDealExpired(true)} />
          )}
          {dealExpired && (
            <div style={{color:'#ef4444', fontWeight:700, marginBottom:12}}>⚡ Deal Expired</div>
          )}
          <button onClick={() => addToCart(product)} style={btn}>Add to Cart</button>
          {/* Product Scanner */}
          <ProductScanner onScan={code => alert(`Scanned code: ${code}`)} />
        </div>
      </div>
      {/* Outfit Builder (global, not per product) */}
      <OutfitBuilder />
    </div>
  );
}
