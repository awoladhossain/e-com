import generateToken from "../middleware/generateToken.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import User from "./user.model.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return errorResponse(res, 400, "All fields are required");
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "User already exists");
    }
    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    // console.log(newUser);
    // res.status(201).json({ message: "User created successfully" });
    successResponse(res, 201, "User created successfully");
  } catch (error) {
    errorResponse(res, 500, "Server Error", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, 400, "All fields are required");
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 400, "Invalid credentials");
    }
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 400, "Invalid credentials");
    }
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    // res.status(200).send({
    //   message: "Login successful",
    //   token,
    //   user: {
    //     id: user._id,
    //     username: user.username,
    //     email: user.email,
    //     role: user.role,
    //     profileImage: user.profileImage,
    //     bio: user.bio,
    //     profession: user.profession,
    //   },
    // });
    successResponse(res, 200, "Login successful", {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    errorResponse(res, 500, "Server Error", error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    // res.status(200).send({ success: true, message: "Logout successful" });
    successResponse(res, 200, "Logout successful");
  } catch (error) {
    errorResponse(res, 500, "Server Error", error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({},'email role').sort({ createdAt: -1 });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    successResponse(res, 200, "User retrieved successfully", user);
  } catch (error) {
    errorResponse(res, 500, "Server Error", error);
  }
};
