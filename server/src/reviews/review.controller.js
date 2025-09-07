import Product from "../products/product.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import Review from "./review.model.js";

export const createPost = async (req, res) => {
  try {
    const { comment, rating, userId, productId } = req.body;
    // ✅ Validate required fields
    if (!comment || rating === undefined || !userId || !productId) {
      return errorResponse(res, 400, "All fields are required");
    }

    // ✅ Validate rating
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return errorResponse(
        res,
        400,
        "Rating must be an integer between 1 and 5"
      );
    }

    // ✅ Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    // ✅ Check for existing review by the same user
    const existingReview = await Review.findOne({ userId, productId });

    if (existingReview) {
      existingReview.comment = comment;
      existingReview.rating = rating;
      const updatedReview = await existingReview.save();

      // ✅ Recalculate average rating
      const [result] = await Review.aggregate([
        { $match: { productId: product._id } },
        { $group: { _id: null, averageRating: { $avg: "$rating" } } },
      ]);

      const averageRating = result ? result.averageRating : 0;
      product.averageRating = averageRating;
      await product.save();

      return successResponse(res, 200, "Review updated successfully", {
        updatedReview,
        averageRating,
      });
    }

    // ✅ Create new review
    const newReview = new Review({
      comment,
      rating,
      userId,
      productId,
    });

    const savedReview = await newReview.save();

    // ✅ Recalculate average rating
    const [result] = await Review.aggregate([
      { $match: { productId: product._id } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } },
    ]);

    const averageRating = result ? result.averageRating : 0;
    product.averageRating = averageRating;
    await product.save();

    return successResponse(res, 201, "Review created successfully", {
      savedReview,
      averageRating,
    });
  } catch (error) {
    console.error("Error creating/updating review:", error);
    return errorResponse(res, 500, "Server Error");
  }
};

export const getUserReviews = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return errorResponse(res, 400, "User ID is required");
    }
    const userReview = await Review.find({ userId: userId }).sort({
      createdAt: -1,
    });

    if (!userReview || userReview.length === 0) {
      return errorResponse(res, 404, "No reviews found for this user");
    }

    return successResponse(res, 200, "User reviews retrieved successfully", {
      userReview,
    });
  } catch (error) {
    return errorResponse(res, 500, "Server Error");
  }
};

export const getTotalReviews = async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();
    return successResponse(res, 200, "Total reviews retrieved successfully", {
      totalReviews,
    });
  } catch (error) {
    return errorResponse(res, 500, "Server Error");
  }
};
