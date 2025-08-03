import { useEffect, useState } from "react";
import './App.css';

function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const addToCart = (itemId) => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return alert("Please login first!");

    fetch("http://localhost:8080/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, item_id: itemId })
    })
      .then(res => res.json())
      .then(() => alert("Item added to cart!"))
      .catch(() => alert("Error adding item"));
  };

  const placeOrder = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return alert("Please login first!");

    fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    })
      .then(res => res.json())
      .then(() => alert("Order placed successfully!"))
      .catch(() => alert("Error placing order"));
  };

  const viewCart = () => {
    fetch("http://localhost:8080/carts")
      .then(res => res.json())
      .then(data => {
        const userId = localStorage.getItem("user_id");
        const userCart = data.find(c => c.user_id == userId);
        if (userCart && userCart.items.length > 0) {
          alert("Cart Items:\n" + userCart.items.map(i => i.name).join(", "));
        } else {
          alert("Your cart is empty.");
        }
      });
  };

  const viewOrders = () => {
    fetch("http://localhost:8080/orders")
      .then(res => res.json())
      .then(data => {
        const userId = localStorage.getItem("user_id");
        const userOrders = data.filter(o => o.user_id == userId);
        if (userOrders.length > 0) {
          alert("Your Orders:\n" + userOrders.map(o => "Order ID: " + o.ID).join("\n"));
        } else {
          alert("No orders placed yet.");
        }
      });
  };

  return (
    <div className="container">
      <h2>Available Items</h2>
      <div className="button-group">
        <button onClick={placeOrder}>Checkout</button>
        <button onClick={viewCart}>Cart</button>
        <button onClick={viewOrders}>Order History</button>
      </div>
      <div className="items-grid">
        {items.map((item) => (
          <div key={item.ID} className="item-card">
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item.ID)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
