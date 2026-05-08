import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        Rayan<span>Shop</span>
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">Shop</Link>
        {user && (
          <span className="nav-greeting">Hi, {user.email.split("@")[0]}</span>
        )}
      </div>

      <div className="nav-actions">
        {!user ? (
          <Link to="/auth" className="nav-signin-btn">Sign In</Link>
        ) : (
          <button className="nav-signin-btn nav-signout-btn" onClick={logout}>
            Sign Out
          </button>
        )}

        <Link to="/checkout" className="nav-cart-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Cart
          {cartCount > 0 && (
            <span className="nav-cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}