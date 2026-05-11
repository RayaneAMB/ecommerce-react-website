import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Rayan<span>Shop</span></Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        
        {user ? (
          <>
            <span className="nav-link text-success">Hi, {user.email.split('@')[0]}!</span>
            <Link to="/orders" className="nav-link">My Orders</Link>
            <button className="nav-link btn-ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login/Signup</Link>
        )}

        <Link to="/checkout" className="nav-cart">
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}