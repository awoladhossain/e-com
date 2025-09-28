import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createPost,
  getTotalReviews,
  getUserReviews,
} from "./review.controller.js";

const router = express.Router();

router.post("/post-review", verifyToken, createPost);
router.get("/get-reviews-count", verifyToken, getTotalReviews);
router.get("/:userId", verifyToken, getUserReviews);

export default router;
