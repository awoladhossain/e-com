import { errorResponse } from "../utils/responseHandler.js";
import Review from "./review.model.js";

export const createPost = async (req, res) => {
  try {
    const { comment, rating, userId, productId } = req.body;
    if (!comment || rating === undefined || !userId || !productId) {
      return errorResponse(res, 400, "All fields are required");
    }
    const exitingReview = await Review.findOne({
      userId,
      productId,
    });
    if (exitingReview) {
      return errorResponse(res, 400, "You have already reviewed this product");
    }
    const newReview = new Review({
      comment,
      rating,
      userId,
      productId,
    });
    const savedReview = await newReview.save();
    return successResponse(res, 201, "Review created successfully", {
      savedReview,
    });
  } catch (error) {
    return errorResponse(res, 500, "Server Error", error);
  }
};
