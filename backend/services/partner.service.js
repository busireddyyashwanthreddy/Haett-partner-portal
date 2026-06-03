import Application from "../models/Application.model.js";
import AppError from "../utils/AppError.js";
import { ROLES } from "../utils/constants.js";
import {
  getPartnerDiscountCodes,
  getPartnerStats,
} from "./discountCode.service.js";

export const getPartnerDashboard = async (userId, userRole) => {
  if (userRole !== ROLES.PARTNER) {
    throw new AppError("Partner access required", 403);
  }

  const application = await Application.findOne({ userId });

  if (!application) {
    throw new AppError("Approved application not found", 404);
  }

  const stats = await getPartnerStats(userId);
  const discountCodes = await getPartnerDiscountCodes(userId);

  return {
    stats: {
      ...stats,
      approvalDate: application.approvedAt,
    },
    discountCodes: discountCodes.map((code) => ({
      id: code._id,
      code: code.code,
      active: code.active,
      usageCount: code.usageCount,
      expiryDate: code.expiryDate,
      discountType: code.discountType,
      discountValue: code.discountValue,
      customerSavings: code.customerSavings,
    })),
  };
};
