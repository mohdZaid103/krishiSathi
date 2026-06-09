import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

dotenv.config();
import express from 'express';

const app = express();

connectDB();

const allowedOrigins = ["http://localhost:5173"];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
} else {
  console.warn("⚠️ Warning: CLIENT_URL environment variable is not defined!");
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS Error: Origin ${origin} is not allowed.`));
    }
  },
  credentials: true,
}));

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
import dashboardRoutes from "./routes/dashboard.route.js";
import profileRoutes from "./routes/profile.route.js";

//use routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/disease", diseaseRoutes)
app.use("/api/detections", detectionRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
