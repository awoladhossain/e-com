import express from "express";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "./product.controller.js";

const router = express.Router();

router.post("/create-product", verifyToken, verifyAdmin, createProduct);
router.get("/get-all-products", getAllProducts);
router.get("/get-product/:id", getProduct);
router.patch("/update-product/:id", verifyAdmin, verifyToken, updateProduct);
router.delete("/delete-product/:id", verifyAdmin, verifyToken, deleteProduct);

export default router;
