# KrishiSathi – AI-Powered Agricultural Marketplace

KrishiSathi is a full-stack MERN application designed to empower farmers with AI-driven crop disease detection and a dedicated agricultural marketplace. The platform connects farmers and sellers while providing smart disease diagnosis, treatment recommendations, secure payments, and order management.

---

## Live Demo

**Frontend:** https://krishisathi-frontend.onrender.com/

**Backend API:** https://krishisathi-backend.onrender.com/

---

## Features

### Farmer Features

* Google Authentication using Firebase
* AI-powered crop disease detection
* Disease detection history
* Product browsing and search
* Add products to cart
* Secure checkout with Razorpay
* Order history and order tracking
* Profile management
* Personalized dashboard

### Seller Features

* Seller registration and authentication
* Add new products
* Edit existing products
* Delete products
* View incoming orders
* Update order status

  * Pending
  * Processing
  * Shipped
  * Delivered
* Revenue analytics dashboard
* Top-selling products insights

### Security & Access Control

* JWT-based authentication
* Google OAuth login
* Role-Based Access Control (RBAC)
* Protected frontend routes
* Protected backend APIs

---

## AI Disease Detection

Farmers can upload crop leaf images and receive:

* Disease identification
* Disease description
* Recommended treatment
* Suggested agricultural products

All detections are stored in the user's history for future reference.

---

## Payment Integration

KrishiSathi integrates Razorpay for secure online payments.

Features include:

* Order creation
* Payment verification
* Secure checkout workflow
* Automatic order generation after successful payment

---

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* Firebase Authentication
* Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Firebase Admin SDK
* Razorpay

### Deployment

* Frontend: Render
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

```text
KrishiSathi
│
├── frontend
│   ├── pages
│   ├── components
│   ├── services
│   ├── context
│   └── layouts
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middlewares
│   ├── config
│   └── utils
│
└── README.md
```

---

## Application Workflow

### Farmer Workflow

```text
Login
  ↓
Disease Detection
  ↓
Browse Products
  ↓
Add to Cart
  ↓
Razorpay Payment
  ↓
Order Placement
  ↓
Track Orders
```

### Seller Workflow

```text
Login as Seller
  ↓
Add Products
  ↓
Receive Orders
  ↓
Update Order Status
  ↓
Track Revenue
```

---

## Screenshots

Add screenshots for:

* Home Page
<img width="1776" height="897" alt="image" src="https://github.com/user-attachments/assets/99526054-84cd-4bc4-b91b-6b6a76bbe103" />

* Disease Detection
* <img width="1796" height="880" alt="image" src="https://github.com/user-attachments/assets/9809c9e8-24a5-4da8-b8ff-6e4864e8cd1d" />

* Products Page
* <img width="1740" height="858" alt="image" src="https://github.com/user-attachments/assets/ca3b7a1c-8a92-4966-a493-3583f5566e84" />

* Cart
* <img width="1368" height="853" alt="image" src="https://github.com/user-attachments/assets/f71dcdfe-e477-4f0f-85f2-c57f1fb2d7a2" />
* Seller Dashboard
* <img width="1594" height="851" alt="image" src="https://github.com/user-attachments/assets/b1399ee2-fb6a-4f9c-9487-c1996cae1b8e" />

* Seller Orders
* <img width="1172" height="638" alt="image" src="https://github.com/user-attachments/assets/206103f2-60fb-4752-95d2-1a5a9cbc945f" />
---

## Owner
 * mohd zaid


---

## Future Enhancements

* Product Reviews & Ratings
* Real-time Notifications
* Inventory Management
* AI Crop Yield Prediction
* Weather-Based Recommendations
* Multi-language Support

---

## License

This project was developed for educational and portfolio purposes.

