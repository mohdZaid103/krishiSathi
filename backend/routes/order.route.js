import express from "express";
import auth from "../middlewares/auth.middleware.js";

import {
  placeOrder,
  getMyOrders,
  getOrderById,
  createRazorpayOrder,
  verifyPayment,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post(
  "/create-payment-order",
  auth,
  createRazorpayOrder
);

router.post(
  "/place",
  auth,
  placeOrder
);

router.get(
  "/",
  auth,
  getMyOrders
);
router.post(
  "/verify-payment",
  auth,
  verifyPayment
);
router.get(
  "/:id",
  auth,
  getOrderById
);

export default router;