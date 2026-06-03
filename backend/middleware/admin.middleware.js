import AppError from "../utils/AppError.js";
import { ROLES } from "../utils/constants.js";

export const adminOnly = (req, _res, next) => {
  if (!req.user || req.user.role !== ROLES.ADMIN) {
    throw new AppError("Admin access required", 403);
  }
  next();
};
