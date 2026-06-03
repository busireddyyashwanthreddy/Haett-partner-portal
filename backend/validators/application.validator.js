import { body } from "express-validator";
import { PARTNER_TYPES } from "../utils/constants.js";

export const applicationRules = [
  body("partnerType")
    .isIn(PARTNER_TYPES)
    .withMessage("Valid partner type is required"),
  body("businessName")
    .trim()
    .notEmpty()
    .withMessage("Business name is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("audienceSize")
    .trim()
    .notEmpty()
    .withMessage("Audience size is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("website")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid website URL"),
  body("socialLink")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid social link URL"),
];
