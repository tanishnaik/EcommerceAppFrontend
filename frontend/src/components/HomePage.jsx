// Demo product data and currency symbols
const baseProducts = [
  {
    name: "Wireless Headphones",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
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
  }
];

const reviewsList = [
  "Amazing product! Highly recommend.",
  "Works as expected, good value for money.",
  "Quality could be better, but overall satisfied.",
  "Exceeded my expectations!",
  "Not as described, but customer service helped.",
  "Five stars! Will buy again.",
  "Decent for the price.",
  "Fast delivery and well packaged.",
  "Very comfortable and stylish.",
  "Battery life is impressive!"
];

function getRandomRating() {
  return Math.round(Math.random() * 5);
}
function getRandomReview() {
  return reviewsList[Math.floor(Math.random() * reviewsList.length)];
}

const mockProducts = Array.from({ length: 100 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  // Add a discount to every 3rd product
  const hasDiscount = i % 3 === 0;
  const discountPercent = hasDiscount ? (10 + (i % 4) * 5) : 0; // 10%, 15%, 20%, 25%
  const price = base.price + ((i % 10) * 10);
  const discountedPrice = hasDiscount ? Math.round(price * (1 - discountPercent / 100)) : null;
  return {
    id: i + 1,
    name: `${base.name} ${i + 1}`,
    price,
    discountedPrice,
    discountPercent,
    category: base.category,
    image: base.image,
    description: base.description,
    rating: getRandomRating(),
    review: getRandomReview()
  };
});

const currencySymbols = {
  INR: "₹",
  USD: "$",
  EUR: "€"
};
import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useGlobalSettings } from "../components/GlobalSettingsContext";
import { CartContext } from "../context/CartContext";
import { RecentlyViewedContext } from "../context/RecentlyViewedContext";
import ProductCard from "../components/ProductCard";

// Inline style for Add to Cart button
const addToCartBtnStyle = {
  background: 'linear-gradient(90deg, #2563eb 60%, #1e40af 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '10px 18px',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(37,99,235,0.12)',
  transition: 'background 0.2s',
  marginTop: 10,
  width: '100%'
};
import QuickViewModal from "../components/QuickViewModal";

function HomePage() {
  const { language, setLanguage, currency, setCurrency } = useGlobalSettings();
  const { addToCart } = useContext(CartContext);
  const { recentlyViewed, clearRecentlyViewed } = useContext(RecentlyViewedContext);
  const { dark, toggleTheme } = useContext(ThemeContext);

  const [products] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [category, setCategory] = useState("");
  const [quickView, setQuickView] = useState(null);
  // Find min and max price from products for slider bounds
  const allPrices = products.map(p => p.price);
  const absoluteMin = Math.min(...allPrices);
  const absoluteMax = Math.max(...allPrices);
  const [priceRange, setPriceRange] = useState([absoluteMin, absoluteMax]);

  const filtered = products.filter(
    (p) => {
      const searchText = search.trim().toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(searchText);
      const descMatch = p.description?.toLowerCase().includes(searchText);
      const categoryMatch = p.category.toLowerCase().includes(searchText);
      const matches = !searchText || nameMatch || descMatch || categoryMatch;
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      return (!category || p.category === category) && matches && priceMatch;
    }
  );

  // AI-like search: show live dropdown with product name, price, and review
  React.useEffect(() => {
    const searchText = search.trim().toLowerCase();
    if (!searchText) {
      setSearchResults([]);
      return;
    }
    const results = products.filter(p => {
      return (
        p.name.toLowerCase().includes(searchText) ||
        p.description?.toLowerCase().includes(searchText) ||
        p.category.toLowerCase().includes(searchText)
      );
    }).slice(0, 8);
    setSearchResults(results);
  }, [search, products]);

  const container = {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "24px 16px",
    fontFamily: "Poppins, sans-serif",
    background: dark ? "#18181b" : "#f8fafc",
    color: dark ? "#f3f4f6" : "#18181b",
    minHeight: "100vh",
    display: "flex",
    gap: 32,
  };

  const input = {
    border: dark ? '1px solid #444' : '1px solid #ccc',
    borderRadius: 10,
    padding: '10px 16px',
    fontSize: 16,
    width: '100%',
    maxWidth: 320,
    background: dark ? '#23232a' : '#fff',
    color: dark ? '#f3f4f6' : '#18181b',
  };

  const select = {
    ...input,
    maxWidth: 200,
    background: dark ? '#23232a' : '#fff',
    color: dark ? '#f3f4f6' : '#18181b',
  };

  const grid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 32,
    marginTop: 0,
    justifyItems: 'center',
    alignItems: 'stretch',
    minHeight: '600px',
    flex: 1,
  };

  const sidebar = {
    minWidth: 280,
    maxWidth: 320,
    background: dark ? '#23232a' : '#fff',
    borderRadius: 18,
    boxShadow: dark ? '0 4px 24px #00000044' : '0 4px 24px #2563eb22',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
    height: 'fit-content',
    position: 'sticky',
    top: 32,
  };

  // Helper to render stars for rating
  function renderStars(rating) {
    return (
      <span>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < rating ? '#fbbf24' : '#d1d5db', fontSize: 18, marginRight: 2 }}>★</span>
        ))}
      </span>
    );
  }

  return (
    <div style={container}>
      <aside style={sidebar}>
        <button onClick={toggleTheme} style={{ background: dark ? '#23232a' : '#e5e7eb', color: dark ? '#f3f4f6' : '#18181b', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 18 }}>
          {dark ? (language === 'hi' ? 'लाइट मोड' : 'Light Mode') : (language === 'hi' ? 'डार्क मोड' : 'Dark Mode')}
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: dark ? '#f3f4f6' : '#18181b' }}>{language === 'hi' ? 'भाषा चुनें' : 'Select Language'}</label>
          <select value={language} onChange={e => setLanguage(e.target.value)} style={{ ...select, maxWidth: '100%' }}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
          <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, marginTop: 12, color: dark ? '#f3f4f6' : '#18181b' }}>{language === 'hi' ? 'मुद्रा चुनें' : 'Select Currency'}</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ ...select, maxWidth: '100%' }}>
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select>
        </div>
        <div style={{ marginTop: 24 }}>
          <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: dark ? '#f3f4f6' : '#18181b' }}>{language === "hi" ? "श्रेणी चुनें" : "Select Category"}</label>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...select, maxWidth: '100%' }}>
            <option value="">{language === "hi" ? "सभी श्रेणियां" : "All Categories"}</option>
            <option value="Electronics">{language === "hi" ? "इलेक्ट्रॉनिक्स" : "Electronics"}</option>
            <option value="Fashion">{language === "hi" ? "फैशन" : "Fashion"}</option>
          </select>
        </div>
        <div style={{ marginTop: 24 }}>
          <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: dark ? '#f3f4f6' : '#18181b' }}>{language === 'hi' ? 'मूल्य सीमा चुनें' : 'Select Price Range'}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, color: dark ? '#d1d5db' : '#555' }}>{priceRange[0]}</span>
            <input
              type="range"
              min={absoluteMin}
              max={absoluteMax}
              value={priceRange[0]}
              onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
              style={{ width: 80 }}
            />
            <span style={{ fontSize: 14, color: dark ? '#d1d5db' : '#555' }}>{priceRange[1]}</span>
            <input
              type="range"
              min={absoluteMin}
              max={absoluteMax}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              style={{ width: 80 }}
            />
          </div>
          <div style={{ fontSize: 13, color: dark ? '#d1d5db' : '#555', marginTop: 2 }}>
            {language === 'hi'
              ? `मूल्य: ₹${priceRange[0]} से ₹${priceRange[1]}`
              : `Price: ₹${priceRange[0]} to ₹${priceRange[1]}`}
          </div>
        </div>
      </aside>
      <main style={{ flex: 1 }}>
        {/* Search box below navbar */}
        <div style={{ marginBottom: 32, marginTop: 0, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
          <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: dark ? '#f3f4f6' : '#18181b', display: 'block' }}>{language === 'hi' ? 'खोजें' : 'Search'}</label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder={language === "hi" ? "उत्पाद खोजें..." : "Search products..."}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={input}
              autoComplete="off"
            />
          {searchResults.length > 0 && (
            <div style={{ position: 'absolute', top: 44, left: 0, right: 0, background: dark ? '#23232a' : '#fff', border: dark ? '1px solid #444' : '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 2px 12px rgba(37,99,235,0.10)', zIndex: 10 }}>
              {searchResults.map(product => (
                <div key={product.id} style={{ padding: '10px 16px', borderBottom: dark ? '1px solid #444' : '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onClick={() => { setQuickView(product); setSearchResults([]); setSearch(product.name); }}>
                  <span style={{ fontWeight: 600, color: dark ? '#f3f4f6' : '#18181b', fontSize: 16 }}>{product.name}</span>
                  <span style={{ fontSize: 14, color: dark ? '#d1d5db' : '#555' }}>
                    {product.discountedPrice ? (
                      <>
                        <span style={{ textDecoration: 'line-through', color: '#ef4444', marginRight: 6 }}>₹{product.price}</span>
                        <span style={{ color: '#22c55e', fontWeight: 700 }}>₹{product.discountedPrice}</span>
                        <span style={{ color: '#2563eb', marginLeft: 6 }}>({product.discountPercent}% OFF)</span>
                      </>
                    ) : (
                      <>₹{product.price}</>
                    )}
                    {' '}| {product.review}
                  </span>
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
        {recentlyViewed?.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#2563eb', margin: 0 }}>
                {language === "hi" ? "हाल ही में देखे गए" : "Recently Viewed"}
              </h3>
              <button
                onClick={clearRecentlyViewed}
                style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginLeft: 12 }}
              >
                {language === "hi" ? "साफ़ करें" : "Clear"}
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
              {recentlyViewed.map(product => (
                <div style={{ border: dark ? '1px solid #444' : '1px solid #e5e7eb', borderRadius: 16, boxShadow: dark ? '0 2px 12px rgba(0,0,0,0.32)' : '0 2px 12px rgba(0,0,0,0.04)', background: dark ? '#23232a' : '#fff', padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'stretch', minWidth: 280, minHeight: 380, color: dark ? '#f3f4f6' : '#18181b' }}>
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onQuickView={setQuickView}
                    addToCartBtnStyle={addToCartBtnStyle}
                    goToCartBtnStyle={addToCartBtnStyle}
                  />
                  <div style={{ marginTop: 10 }}>
                    {renderStars(product.rating || 0)}
                    <div style={{ fontSize: 15, color: dark ? '#d1d5db' : '#555', marginTop: 4 }}>
                      {product.review || ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={grid}>
          {filtered.slice(0, 9).map(product => (
            <div style={{ border: dark ? '1px solid #444' : '1px solid #e5e7eb', borderRadius: 16, boxShadow: dark ? '0 2px 12px rgba(0,0,0,0.32)' : '0 2px 12px rgba(0,0,0,0.04)', background: dark ? '#23232a' : '#fff', padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'stretch', minHeight: 380, color: dark ? '#f3f4f6' : '#18181b' }}>
              <ProductCard
                key={product.id}
                product={{ ...product, currency: currencySymbols[currency] }}
                onAddToCart={addToCart}
                onQuickView={setQuickView}
                addToCartBtnStyle={addToCartBtnStyle}
                goToCartBtnStyle={addToCartBtnStyle}
              />
              <div style={{ marginTop: 10 }}>
                {product.discountedPrice ? (
                  <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>
                    <span style={{ textDecoration: 'line-through', color: '#ef4444', marginRight: 8 }}>₹{product.price}</span>
                    <span style={{ color: '#22c55e', fontWeight: 700 }}>₹{product.discountedPrice}</span>
                    <span style={{ color: '#2563eb', marginLeft: 8 }}>({product.discountPercent}% OFF)</span>
                  </div>
                ) : (
                  <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>₹{product.price}</div>
                )}
                {renderStars(product.rating || 0)}
                <div style={{ fontSize: 15, color: dark ? '#d1d5db' : '#555', marginTop: 4 }}>
                  {product.review || ''}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ marginTop: 48, textAlign: 'center', fontWeight: 600, fontSize: 22, color: dark ? '#d1d5db' : '#777' }}>
            {language === "hi" ? "कोई उत्पाद नहीं मिला" : "No products found."}
          </div>
        )}
        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
        {/* ProductChatbot moved to support page */}
    </main>
  </div>
  );
}

export default HomePage;
export { mockProducts };
