import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-20 text-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">404 - Page Not Found</h2>
      <button onClick={() => navigate("/")} className="text-blue-600 underline">Go Home</button>
    </div>
  );
}
