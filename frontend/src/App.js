import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Items from "./Items";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory"; 
import Register from "./Register";
function App() {
  return (
    <Router>
      <nav style={{ padding: "10px" }}>
        <Link to="/items" style={{ marginRight: "10px" }}>Items</Link>
        <Link to="/cart" style={{ marginRight: "10px" }}>Cart</Link>
        <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
        <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
        <Link to="/orders" style={{ marginRight: "10px" }}>Orders</Link>
          
        </nav>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Items />} />
           <Route path="/items" element={<Items />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/register" element={<Register />} />
        </Routes>
</Router>
  );
}

export default App;

