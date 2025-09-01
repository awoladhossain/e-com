import Review from "../reviews/review.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import Product from "./product.model.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body });
    const savedProduct = await newProduct.save();
    const reviews = await Review.find({ product: savedProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      // console.log(totalRating);
      const averageRating = totalRating / reviews.length;
      // console.log(averageRating);
      savedProduct.rating = averageRating;
      await savedProduct.save();
    }
    return successResponse(
      res,
      201,
      "Product created successfully",
      savedProduct._doc
    );
  } catch (error) {
    return errorResponse(res, 500, "Server Error", error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;
    let filter = {};
    if (category && category !== "all") {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }
    if (color && color !== "all") {
      filter.color = { $regex: new RegExp(`^${color}$`, "i") };
    }
    if (minPrice && maxPrice) {
      const min = parseInt(minPrice);
      const max = parseInt(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email username");

    return successResponse(res, 200, "Products fetched successfully", {
      products,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    return errorResponse(res, 500, "Server Error", error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate(
      "author",
      "email username"
    );
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }
    const reviews = await Review.find({ productId: id }).populate(
      "userId",
      "email username"
    );
    return successResponse(res, 200, "Product fetched successfully", {
      product,
      reviews,
    });
  } catch (error) {
    return errorResponse(res, 500, "Server Error", error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }
    return successResponse(
      res,
      200,
      "Product updated successfully",
      product._doc
    );
  } catch (error) {
    return errorResponse(res, 500, "Server Error", error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }
    await Review.deleteMany({ productId });
    return successResponse(res, 200, "Product deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Server Error", error);
  }
};
