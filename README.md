# 🛒 ShopKart – E-Commerce Web Application

ShopKart is a full-stack e-commerce web application that allows users to browse products, add items to their cart, sign up/log in, and securely place orders. It includes a simple admin interface for managing products and orders.


---

## 📦 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS 
- Axios
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication

**Other Tools:**
- Redux Toolkit (optional)
- Cloudinary (for image upload)
- Stripe/PayPal (for payments)


---

## 🛠️ Features

- ✅ User Registration & Login (with JWT)
- 🛒 Product Listings with Categories
- 📦 Add to Cart & Remove from Cart
- 🧾 Checkout & Order Summary
- 🔐 Protected Routes for Users
- 🛠️ Admin Dashboard (CRUD for products)
- 📷 Image Upload via Cloudinary
- 💳 Stripe/PayPal Payments (Optional)
- 📜 Order History

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/shopKart.git
cd shopKart
```
## Setup Environment Variables
Create a .env file 
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
---
 ##  Install Dependencies
 
 ###  Backend
 
 ```bash
cd backend
npm install
code server.js
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```




