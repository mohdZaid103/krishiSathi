import express from "express";
import auth from "../middlewares/auth.middleware.js";

import {
  placeOrder,
  getMyOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place", auth, placeOrder);

router.get("/", auth, getMyOrders);

export default router;