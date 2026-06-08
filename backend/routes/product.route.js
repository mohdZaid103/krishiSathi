import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  getMyProducts,
  deleteProduct,
} from "../controllers/product.controller.js";

import auth from "../middlewares/auth.middleware.js";
import sellerOnly from "../middlewares/seller.middleware.js";

const router = express.Router();

/* Public */

router.get("/", getProducts);


/* Seller */

router.post(
  "/",
  auth,
  sellerOnly,
  createProduct
);

router.get(
  "/my-products",
  auth,
  sellerOnly,
  getMyProducts
);

router.delete(
  "/:id",
  auth,
  sellerOnly,
  deleteProduct
);

router.get("/:id", getProductById);

export default router;