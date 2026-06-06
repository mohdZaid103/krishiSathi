import express from "express";

import auth from "../middlewares/auth.middleware.js";

import {
  addToCart,
  getCart,
  removeFromCart,
  decreaseQuantity
} from "../controllers/cart.controller.js";


const router = express.Router();
router.patch(
  "/decrease",
  auth,
  decreaseQuantity
);
router.post("/add", auth, addToCart);

router.get("/", auth, getCart);
router.delete("/remove", auth, removeFromCart);

export default router;