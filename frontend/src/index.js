import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./store/authContext";
import "antd/dist/reset.css";
import { SearchProvider } from "./store/SearchContext";
import { CartProvider } from "./store/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartProvider>
      <SearchProvider>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_ID}>
            <App />
        </GoogleOAuthProvider>
      </SearchProvider>
    </CartProvider>
  </AuthProvider>
);
