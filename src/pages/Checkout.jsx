import { useCart } from "../context/CartContext";

export default function Checkout() {
  const {
    getCartItemsWithProducts,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    clearCart,
  } = useCart();

  const cartItems = getCartItemsWithProducts();
  const total = getCartTotal();

  function placeOrder() {
    alert("Order placed! Thank you 🎉");
    clearCart();
  }

  if (cartItems.length === 0) {
    return (
      <div className="rs-page">
        <div className="checkout-wrap">
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h2 className="empty-title">Your cart is empty</h2>
            <p className="empty-desc">Discover products you'll love.</p>
            <a href="/" className="btn btn-primary">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rs-page">
      <div className="checkout-wrap">
        <p className="section-label">Review</p>
        <h1 className="section-title">Your Order</h1>

        <div className="checkout-grid">
          {/* Items */}
          <div>
            <h2 className="checkout-section-title">
              Order items ({cartItems.reduce((s, i) => s + i.quantity, 0)})
            </h2>

            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <div className="checkout-item-img">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="checkout-img"
                  />
                </div>
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.product.name}</p>
                  <p className="checkout-item-unit">
                    ${item.product.price.toFixed(2)} each
                  </p>
                </div>
                <div className="checkout-item-right">
                  <p className="checkout-item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="summary-card">
              <h2 className="checkout-section-title">Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="summary-row">
                <span>Taxes</span>
                <span>—</span>
              </div>
              <div className="summary-total-row">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="place-btn" onClick={placeOrder}>
                Place Order →
              </button>
              <a href="/" className="btn btn-ghost btn-block">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}