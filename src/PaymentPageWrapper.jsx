import React, { useContext } from "react";
import PaymentPage from "./components/PaymentPage";
import { CartContext } from "./context/CartContext";
export default function PaymentPageWrapper() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return <PaymentPage products={cart} amount={total} />;
}
