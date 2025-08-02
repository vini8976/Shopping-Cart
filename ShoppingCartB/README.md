# 🛒 Shopping Cart Web App

This is a fullstack shopping cart application built with:

- **Backend**: Golang (Gin framework, GORM ORM)
- **Frontend**: React
- **Database**: SQLite (or MySQL/Postgres depending on your setup)

---

## 📦 Features

- User registration and login with token-based session
- View available items
- Add items to cart
- Place orders
- View order history
- Basic styling with Bootstrap

---

## 🛠️ Tech Stack

| Part       | Technology            |
|------------|------------------------|
| Frontend   | React, Bootstrap       |
| Backend    | Go (Gin), GORM         |
| Database   | SQLite (or other RDBMS)|

---

## 🚀 How to Run the Project

### 1️⃣ Backend Setup (Go + Gin)

```bash
cd backend
go mod tidy
go run main.go
backend should start at: http://localhost:8080

2️⃣Frontend Setup (React)
bash
Copy code
cd frontend
npm install
npm start
React frontend will start at: http://localhost:3000

📬 API Endpoints
👤 Users
Method	Endpoint	Description
POST	/users	Register user
POST	/users/login	Login user (returns token/user_id)
GET	/users	List all users

🧺 Items
Method	Endpoint	Description
POST	/items	Create item
GET	/items	List all items

🛒 Cart
Method	Endpoint	Description
POST	/carts	Add item to cart (user token required)
GET	/carts	View user cart

📦 Orders
Method	Endpoint	Description
POST	/orders	Place order
GET	/orders	View order history

🧪 Postman Collection
Use the shopping_cart.postman_collection.json to test the backend APIs.

1.Open Postman

2.Import the collection

3.Set {{base_url}} to http://localhost:8080

✔️ Includes:

-User registration/login

-Add items

-Add to cart

-Place order

-Get order history

