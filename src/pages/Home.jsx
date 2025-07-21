import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { RecentlyViewedContext } from "../context/RecentlyViewedContext";
import QuickViewModal from "../components/QuickViewModal";

import Carousel from "../components/Carousel";
import ARTryOn from "../components/ARTryOn";
import UnboxingAnimation from "../components/UnboxingAnimation";
import ProductScanner from "../components/ProductScanner";
import OutfitBuilder from "../components/OutfitBuilder";
import LightningDealTimer from "../components/LightningDealTimer";
import Product360Viewer from "../components/Product360Viewer";
import SkinTonePreview from "../components/SkinTonePreview";
import DragDropOutfitBuilder from "../components/DragDropOutfitBuilder";
import MapProductFilter from "../components/MapProductFilter";
import SpinWheelDiscount from "../components/SpinWheelDiscount";
import axios from "axios";

const baseProducts = [
  {
    name: "Wireless Headphones",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    description: "High-quality sound, noise cancellation, 20h battery life."
  },
  {
    name: "Smart Watch",
    price: 4499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description: "Track fitness, heart rate, notifications, and more."
  },
  {
    name: "Trendy Sneakers",
    price: 1799,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80",
    description: "Comfortable, stylish, and perfect for everyday wear."
  },
  {
    name: "Bluetooth Speaker",
    price: 1599,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "Portable, waterproof, and powerful sound."
  },
  {
    name: "Classic Backpack",
    price: 999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    description: "Durable, stylish, and perfect for daily use."
  },
  {
    name: "Sunglasses",
    price: 799,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    description: "UV protection, lightweight, and trendy."
  },
  {
    name: "Fitness Tracker",
    price: 2499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    description: "Track steps, sleep, and calories."
  },
  {
    name: "Leather Wallet",
    price: 599,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description: "Premium leather, slim, and stylish."
  },
  {
    name: "Wireless Mouse",
    price: 499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    description: "Ergonomic, long battery life, and precise."
  },
];

const mockProducts = Array.from({ length: 100 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  // Add dummy rating (3-5) and reviews (10-500)
  const rating = 3 + (i % 3) + (Math.random() > 0.7 ? 1 : 0); // 3-5 stars
  const reviews = 10 + Math.floor(Math.random() * 490); // 10-500
  return {
    id: i + 1,
    name: `${base.name} ${i + 1}`,
    price: base.price + ((i % 10) * 10),
    category: base.category,
    image: base.image,
    description: base.description,
    rating,
    reviews,
  };
});

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [quickView, setQuickView] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { recentlyViewed, addRecentlyViewed } = useContext(RecentlyViewedContext);
  const [dealExpired, setDealExpired] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      localStorage.setItem("allProducts", JSON.stringify(mockProducts));
    }, 500);
  }, []);

  const filtered = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  const container = {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '40px 16px',
  };
  const filterRow = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const input = {
    border: '1px solid #bfdbfe',
    borderRadius: 8,
    padding: '10px 16px',
    fontSize: 16,
    flex: 1,
    minWidth: 220,
    marginRight: 8,
  };
  const select = {
    border: '1px solid #bfdbfe',
    borderRadius: 8,
    padding: '10px 16px',
    fontSize: 16,
    minWidth: 180,
  };
  const grid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 32,
    marginTop: 24,
  };
  const noProducts = {
    textAlign: 'center',
    color: '#2563eb',
    marginTop: 40,
    fontWeight: 500,
    fontSize: 20,
  };

  // Carousel slides: pick 3 featured products
  const featured = products.slice(0, 3).map(p => ({ image: p.image, title: p.name }));

  // Animated card style
  const animatedCard = {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 12px rgba(37,99,235,0.08)',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'box-shadow 0.2s, transform 0.25s cubic-bezier(.4,0,.2,1)',
    minHeight: 420,
    cursor: 'pointer',
  };

  // Demo images for 360 viewer
  const images360 = [
    products[0]?.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80"
  ];
  // Demo overlay for AR Try On
  const overlayImg = "https://pngimg.com/uploads/sunglasses/sunglasses_PNG44.png";


  return (
    <div style={container}>
      {/* Carousel Hero */}
      {featured.length > 0 && <Carousel slides={featured} />}

      {/* Modern Advanced Features Section */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
        justifyContent: 'center',
        margin: '40px 0 24px 0',
        alignItems: 'stretch',
      }}>
        <div style={{ flex: '1 1 340px', minWidth: 320, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Product360Viewer images={images360} />
          <ARTryOn productImage={products[0]?.image || images360[0]} overlayImage={overlayImg} />
          <UnboxingAnimation productImage={products[0]?.image || images360[0]} />
        </div>
        <div style={{ flex: '1 1 320px', minWidth: 320, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {!dealExpired && (
            <LightningDealTimer endTime={Date.now() + 120000} onExpire={() => setDealExpired(true)} />
          )}
          {dealExpired && (
            <div style={{color:'#ef4444', fontWeight:700, marginBottom:12}}>⚡ Deal Expired</div>
          )}
          <ProductScanner onScan={code => alert(`Scanned code: ${code}`)} />
        </div>
        <div style={{ flex: '1 1 340px', minWidth: 320, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <SkinTonePreview />
          <SpinWheelDiscount />
        </div>
        <div style={{ flex: '1 1 340px', minWidth: 320, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <MapProductFilter />
        </div>
      </div>

      {/* Outfit Builder and Drag & Drop */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', marginBottom: 32 }}>
        <div style={{ flex: '1 1 480px', minWidth: 340, maxWidth: 700 }}>
          <OutfitBuilder />
        </div>
        <div style={{ flex: '1 1 480px', minWidth: 340, maxWidth: 700 }}>
          <DragDropOutfitBuilder />
        </div>
      </div>

      <div style={filterRow}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={input}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={select}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>
      </div>
      {/* Recently Viewed */}
      {recentlyViewed && recentlyViewed.length > 0 && (
        <div style={{ margin: '32px 0' }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#2563eb', marginBottom: 18 }}>Recently Viewed</h3>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {recentlyViewed.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                cardStyle={{ ...animatedCard, width: 240, minHeight: 320 }}
                btnStyle={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '10px 18px',
                  fontWeight: 700,
                  fontSize: 15,
                  boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                  cursor: 'pointer',
                  marginTop: 12,
                  transition: 'background 0.2s',
                }}
                onQuickView={setQuickView}
              />
            ))}
          </div>
        </div>
      )}
      <div style={grid}>
        {filtered.map(product => (
          <div
            key={product.id}
            style={{ ...animatedCard }}
            tabIndex={0}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onFocus={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onBlur={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ProductCard
              product={product}
              onAddToCart={addToCart}
              cardStyle={{ background: 'transparent', boxShadow: 'none', padding: 0, minHeight: 0 }}
              btnStyle={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: 16,
                boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                cursor: 'pointer',
                marginTop: 12,
                transition: 'background 0.2s',
              }}
              onQuickView={setQuickView}
            />
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div style={noProducts}>No products found.</div>}
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
