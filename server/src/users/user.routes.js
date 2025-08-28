import express from "express";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
} from "./user.controller.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
// only for admin
router.get("/getAllUsers", verifyToken, verifyAdmin, getAllUsers);

export default router;
