import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { googleId } from "./api credentials/Api";
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
        <GoogleOAuthProvider clientId={googleId}>
            <App />
        </GoogleOAuthProvider>
      </SearchProvider>
    </CartProvider>
  </AuthProvider>
);
