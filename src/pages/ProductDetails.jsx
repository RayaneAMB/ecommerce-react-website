import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    // Fetch single item from backend
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          navigate("/"); // Go home if product doesn't exist
          return;
        }
        setProduct(data);
      })
      .catch((err) => console.error(err));
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="rs-page">
        <div className="detail-loading">Loading from Database…</div>
      </div>
    );
  }

  const productInCart = cartItems.find((item) => item.id === product.id);

  return (
    <div className="rs-page">
      <div className="detail-layout">
        <div className="detail-img-wrap">
          <img src={product.image} alt={product.name} className="detail-img" />
        </div>

        <div className="detail-content">
          <button className="detail-back" onClick={() => navigate(-1)}>
            ← Back to shop
          </button>

          <p className="detail-category">{product.category}</p>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>

          {productInCart && (
            <div className="detail-qty-badge">
              <span>🛒</span>
              {productInCart.quantity} in cart
            </div>
          )}

          <button
            className="btn btn-primary"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart{productInCart ? ` (${productInCart.quantity})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}