import asyncHandler from "../utils/asyncHandler.js";
import * as authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const data = await authService.registerUser(req.body);
  res.status(201).json({ success: true, data });
});

export const login = asyncHandler(async (req, res) => {
  const data = await authService.loginUser(req.body);
  res.status(200).json({ success: true, data });
});

export const getMe = asyncHandler(async (req, res) => {
  const data = await authService.getCurrentUser(req.user._id);
  res.status(200).json({ success: true, data });
});

export const logout = asyncHandler(async (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
