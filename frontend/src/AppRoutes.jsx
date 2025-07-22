import React from "react";
import CustomerSupport from "./components/CustomerSupport";
import PaymentPage from "./components/PaymentPage";
import NotFound from "./components/NotFound";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";

export default function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <>
      {/* ...existing routes... */}
      {location.pathname === "/support" && <CustomerSupport />}
      {location.pathname === "/payment" && (
        <PaymentPage products={cart} amount={total} />
      )}
      {location.pathname === "/404" && <NotFound />}
    </>
  );
}
