import Application from "../models/Application.model.js";
import User from "../models/User.model.js";
import AppError from "../utils/AppError.js";
import {
  APPLICATION_STATUS,
  ROLES,
  USER_APPLICATION_STATUS,
} from "../utils/constants.js";
import { createPartnerDiscountCode } from "./discountCode.service.js";

const getApplicationOrFail = async (id) => {
  const application = await Application.findById(id).populate(
    "userId",
    "name email role applicationStatus",
  );

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  return application;
};

export const approveApplication = async (applicationId, adminId) => {
  const application = await getApplicationOrFail(applicationId);

  if (application.status === APPLICATION_STATUS.APPROVED) {
    throw new AppError("Application is already approved", 400);
  }

  application.status = APPLICATION_STATUS.APPROVED;
  application.approvedAt = new Date();
  application.rejectionReason = undefined;
  await application.save();

  const user = await User.findById(
    application.userId._id || application.userId,
  );

  user.role = ROLES.PARTNER;
  user.applicationStatus = USER_APPLICATION_STATUS.APPROVED;
  await user.save();

  const discountCode = await createPartnerDiscountCode({
    applicationId: application._id,
    partnerId: user._id,
  });

  return {
    application: {
      id: application._id,
      status: application.status,
      approvedAt: application.approvedAt,
      businessName: application.businessName,
    },
    discountCode: {
      code: discountCode.code,
      discountType: discountCode.discountType,
      discountValue: discountCode.discountValue,
      expiryDate: discountCode.expiryDate,
    },
    reviewedBy: adminId,
  };
};

export const rejectApplication = async (applicationId, rejectionReason) => {
  const application = await getApplicationOrFail(applicationId);

  if (application.status === APPLICATION_STATUS.REJECTED) {
    throw new AppError("Application is already rejected", 400);
  }

  if (!rejectionReason?.trim()) {
    throw new AppError("Rejection reason is required", 400);
  }

  application.status = APPLICATION_STATUS.REJECTED;
  application.rejectionReason = rejectionReason.trim();
  application.approvedAt = undefined;
  await application.save();

  await User.findByIdAndUpdate(application.userId._id || application.userId, {
    applicationStatus: USER_APPLICATION_STATUS.REJECTED,
  });

  return {
    id: application._id,
    status: application.status,
    rejectionReason: application.rejectionReason,
  };
};
