import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user_id) {
          localStorage.setItem("user_id", data.user_id);
          alert("Login successful!");
          navigate("/items");
        } else {
          alert("Login failed");
        }
      })
       .catch(() => alert("Something went wrong"));
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
