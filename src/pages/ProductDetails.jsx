import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (!foundProduct) {
      navigate("/");
      return;
    }
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="rs-page">
        <div className="detail-loading">Loading…</div>
      </div>
    );
  }

  const productInCart = cartItems.find((item) => item.id === product.id);

  return (
    <div className="rs-page">
      <div className="detail-layout">
        {/* Image */}
        <div className="detail-img-wrap">
          <img src={product.image} alt={product.name} className="detail-img" />
        </div>

        {/* Content */}
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