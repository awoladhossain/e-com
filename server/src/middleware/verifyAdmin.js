import { errorResponse } from "../utils/responseHandler.js";

export const verifyAdmin = (req, res, next) => {
  if (req.role === "admin") {
    next();
  } else {
    return errorResponse(res, 403, "Forbidden");
  }
};
