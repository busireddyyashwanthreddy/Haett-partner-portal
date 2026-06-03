import mongoose from "mongoose";
import { APPLICATION_STATUS, PARTNER_TYPES } from "../utils/constants.js";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    partnerType: {
      type: String,
      required: [true, "Partner type is required"],
      enum: PARTNER_TYPES,
    },
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    socialLink: {
      type: String,
      trim: true,
    },
    audienceSize: {
      type: String,
      required: [true, "Audience size is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.PENDING,
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    approvedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
