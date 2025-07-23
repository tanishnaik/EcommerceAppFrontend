# 🛒 eCommerce Frontend (React)

A responsive, feature-rich eCommerce frontend built with **React.js** that mimics modern online shopping experiences like Amazon or Flipkart.  
It includes cart functionality, category filtering, search, product details, and more.

## 🚀 Features

- ✅ Product Listing with category-based filtering
- 🔍 Live Search (search as you type)
- 🛍️ Add to Cart with quantity management
- ❤️ Wishlist support
- 🧾 Checkout Page
- 🌙 Light/Dark Mode Toggle
- 🔗 Persistent Cart and Theme using **Local Storage**
- 🔄 Recently Viewed Products
- 📦 Product Detail Page with dynamic routing
- 📱 Fully Responsive Layout
- 🔔 Toast notifications on actions
- 🧠 Smart Context API for global state (Cart, Auth, Wishlist, etc.)

---

## 🧠 Tech Stack

- **React JS**
- **React Router DOM**
- **Context API**
- **Axios**
- **LocalStorage** (for persistence)
- **Inline CSS** (custom styles per component)
- **React Toastify** (for alerts)

---

## 🗃️ Local Storage Usage

This project uses `localStorage` to store important user data **across sessions**:

| Feature         | Storage Key         | Description |
|----------------|---------------------|-------------|
| Cart Items     | `cartItems`         | Stores all items added to the cart along with quantity. |
| Wishlist Items | `wishlistItems`     | Tracks all wishlist products. |
| Theme Mode     | `themeMode`         | Persists light/dark mode preference. |
| Recent Views   | `recentlyViewed`    | Remembers last few products user viewed. |

All data in localStorage is automatically read and applied when the user revisits the site.

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/ecommerce-frontend.git
cd ecommerce-frontend
npm install
npm start
