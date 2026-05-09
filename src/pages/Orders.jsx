import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If they aren't logged in, kick them back to the login page
    if (!user) {
      navigate("/login");
      return;
    }

    // Fetch this specific user's orders from your backend
    fetch(`http://localhost:5000/api/orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        // Reverse the data so the newest orders show up at the top!
        setOrders(data.reverse()); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        setLoading(false);
      });
  }, [user, navigate]);

  if (loading) return <div className="rs-page"><div className="detail-loading">Loading your orders...</div></div>;

  return (
    <div className="rs-page">
      <div className="section">
        <h1 className="section-title">My Order History</h1>
        
        {orders.length === 0 ? (
          <p>You haven't placed any orders yet. Time to go shopping!</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px", margin: "0 auto" }}>
            {orders.map((order) => (
              <div key={order._id} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
                <p style={{ margin: "0 0 10px 0", color: "#666", fontSize: "0.9rem" }}>
                  <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "10px 0" }} />
                
                {order.items.map((item) => (
                  <div key={item.productId} style={{ display: "flex", justifyContent: "space-between", margin: "5px 0" }}>
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "10px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                  <span>Total:</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}