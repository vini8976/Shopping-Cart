import { useEffect, useState } from "react";

function Cart() {
    const user_id = localStorage.getItem("user_id");

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/carts")
      .then(res => res.json())
      .then((data) => {
        console.log("Cart items from backend:", data);
        setCartItems(data);
      });
  }, []);
  const placeOrder = () => {
     const userId = localStorage.getItem("user_id");
     if (!user_id) {
    alert("Login required");
    return;
  }
  fetch("http://localhost:8080/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Order placed successfully!");
      console.log("Order:", data);
    })
    .catch((err) => {
      console.error("Error placing order:", err);
    });
};


  return (
    <div>
      <h2>Cart</h2>
      <ul>
         {cartItems.map((item, index) => (
    <li key={index}>
      {item.name} - ₹{item.price}
          </li>
          
        ))}
      </ul>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Cart;
