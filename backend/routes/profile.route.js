import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  getProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get(
  "/",
  auth,
  getProfile
);

export default router;