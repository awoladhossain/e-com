import express from "express";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createUser,
  deleteUser,
  editUserProfile,
  getAllUsers,
  loginUser,
  logoutUser,
  updateUserRole,
} from "./user.controller.js";

const router = express.Router();

// register user
router.post("/register", createUser);
// login user
router.post("/login", loginUser);
// logout user
router.post("/logout", logoutUser);
// only for admin
router.get("/getAllUsers", verifyToken, verifyAdmin, getAllUsers);
// delete user
router.delete("/user/:id", verifyToken, verifyAdmin, deleteUser);
// update role of user by the admin
router.put("/user/:id", verifyToken, verifyAdmin, updateUserRole);
// user profile update
router.patch("/edit-profile/:id", verifyToken, editUserProfile);
export default router;
