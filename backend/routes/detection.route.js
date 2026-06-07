import express from "express";

import auth from "../middlewares/auth.middleware.js";

import {
  getDetections,
} from "../controllers/detectionController.js";

const router = express.Router();

router.get(
  "/",
  auth,
  getDetections
);

export default router;