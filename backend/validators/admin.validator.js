import { body } from "express-validator";

export const rejectRules = [
  body("rejectionReason")
    .trim()
    .notEmpty()
    .withMessage("Rejection reason is required")
    .isLength({ min: 10 })
    .withMessage("Rejection reason must be at least 10 characters"),
];
