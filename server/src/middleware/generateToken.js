import jwt from "jsonwebtoken";
import User from "../users/user.model.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error("Token generation failed");
  }
};

export default generateToken;
