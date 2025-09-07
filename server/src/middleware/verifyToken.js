import { errorResponse } from "../utils/responseHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token; // for cookie-based auth from frontend
    // const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token);
    if (!token) {
      return errorResponse(res, 401, "Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return errorResponse(res, 401, "Unauthorized", error);
  }
};
