import express from "express";

import upload from "../middlewares/upload.js";

import { detectDisease } from "../controllers/diseaseController.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/detect",
  auth,
  upload.single("image"),
  detectDisease
);

export default router;