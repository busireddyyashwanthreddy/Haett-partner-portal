import { verifyToken } from "../config/jwt.js";
import User from "../models/User.model.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const errorHandler = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError("Not authorized, no token", 401);
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  const user = await User.findById(decoded.id).select("-password");

  if (!user || !user.isActive) {
    throw new AppError("User not found or inactive", 401);
  }

  req.user = user;
  next();
});
