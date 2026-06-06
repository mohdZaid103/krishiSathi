import express from "express";

import upload from "../middlewares/upload.js";

import { detectDisease } from "../controllers/diseaseController.js";

const router = express.Router();

router.post(
  "/detect",
  upload.single("image"),
  detectDisease
);

export default router;