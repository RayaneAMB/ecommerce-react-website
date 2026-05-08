import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const productInCart = cartItems.find((item) => item.id === product.id);

  return (
    <div className="product-card">
      {productInCart && (
        <div className="tag-in-cart">In cart · {productInCart.quantity}</div>
      )}

      <Link to={`/products/${product.id}`} className="product-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
        />
      </Link>

      <div className="product-body">
        {product.category && (
          <p className="product-category">{product.category}</p>
        )}
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}

        <div className="product-footer">
          <span className="product-price">${Number(product.price).toFixed(2)}</span>
          <div className="product-card-actions">
            <Link to={`/products/${product.id}`} className="product-view-btn">
              View
            </Link>
            <button
              className="add-btn"
              onClick={() => addToCart(product.id)}
              aria-label={`Add ${product.name} to cart`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}