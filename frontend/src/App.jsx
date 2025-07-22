
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarWithRoutes from "./components/Navbar";
import HomePage from "./components/HomePage";
import Compare from "./pages/Compare";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./components/NotFound";
import CustomerSupport from "./components/CustomerSupport";
import PaymentPage from "./components/PaymentPage";
import PaymentPageWrapper from "./PaymentPageWrapper";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import OrderHistory from "./components/OrderHistory";
import InvoicePage from "./components/InvoicePage";
import { ProtectedRoute, AdminRoute } from "./context/AuthRoute";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <Router>
                  <NavbarWithRoutes />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/support" element={<CustomerSupport />} />
                    <Route path="/payment" element={<PaymentPageWrapper />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/invoice/:orderId" element={<InvoicePage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Router>
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
