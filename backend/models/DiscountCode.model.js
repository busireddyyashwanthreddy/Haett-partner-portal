import mongoose from "mongoose";
import { DISCOUNT_TYPES } from "../utils/constants.js";

const discountCodeSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: DISCOUNT_TYPES,
      default: "percentage",
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    usageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    customerSavings: {
      type: Number,
      default: 0,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

const DiscountCode = mongoose.model("DiscountCode", discountCodeSchema);

export default DiscountCode;
