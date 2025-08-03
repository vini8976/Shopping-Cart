import { useEffect, useState } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.ID} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p><strong>Order ID:</strong> {order.ID}</p>
            <p><strong>User ID:</strong> {order.UserID}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.Items.map((item, idx) => (
                <li key={idx}>{item.name} - ₹{item.price}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
