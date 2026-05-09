import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";

import "./App.css";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;