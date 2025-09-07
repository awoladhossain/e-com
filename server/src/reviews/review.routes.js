import express from "express";
import {
  createPost,
  getTotalReviews,
  getUserReviews,
} from "./review.controller.js";

const router = express.Router();

router.post("/post-review", createPost);
router.get("/get-reviews-count", getTotalReviews);
router.get("/:userId", getUserReviews);

export default router;
