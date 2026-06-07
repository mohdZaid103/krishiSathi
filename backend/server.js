import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

dotenv.config();
console.log(
  "SERVER RAZORPAY:",
  process.env.RAZORPAY_KEY_ID
);
import express from 'express';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('krishiSathi API running');
});

//import routes
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import orderRoutes from "./routes/order.route.js"
import diseaseRoutes from "./routes/diseaseRoutes.js";
import detectionRoutes from "./routes/detection.route.js";
import dashboardRoutes
from "./routes/dashboard.route.js";
import profileRoutes
from "./routes/profile.route.js";
//use routes
app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/disease",diseaseRoutes)
app.use("/api/detections",detectionRoutes)
app.use("/api/dashboard",dashboardRoutes)
app.use(
  "/api/profile",
  profileRoutes
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});