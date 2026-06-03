import Application from "../models/Application.model.js";
import User from "../models/User.model.js";
import AppError from "../utils/AppError.js";
import {
  APPLICATION_STATUS,
  USER_APPLICATION_STATUS,
} from "../utils/constants.js";

const formatApplication = (app) => {
  const doc = app.toObject ? app.toObject() : app;
  const userRef = doc.userId;

  return {
    id: doc._id,
    userId: userRef?._id || userRef,
    partnerType: doc.partnerType,
    businessName: doc.businessName,
    phone: doc.phone,
    website: doc.website,
    socialLink: doc.socialLink,
    audienceSize: doc.audienceSize,
    description: doc.description,
    status: doc.status,
    rejectionReason: doc.rejectionReason,
    appliedAt: doc.appliedAt,
    approvedAt: doc.approvedAt,
    user:
      userRef && typeof userRef === "object" && userRef.name
        ? { name: userRef.name, email: userRef.email }
        : undefined,
  };
};

export const submitApplication = async (userId, payload) => {
  const existing = await Application.findOne({ userId });

  if (existing) {
    throw new AppError("You already have an application on file", 409);
  }

  const application = await Application.create({
    userId,
    ...payload,
    status: APPLICATION_STATUS.PENDING,
    appliedAt: new Date(),
  });

  await User.findByIdAndUpdate(userId, {
    applicationStatus: USER_APPLICATION_STATUS.PENDING,
  });

  return formatApplication(application);
};

export const getMyApplication = async (userId) => {
  const application = await Application.findOne({ userId });

  if (!application) {
    return null;
  }

  return formatApplication(application);
};

export const reapplyApplication = async (userId, payload) => {
  const application = await Application.findOne({ userId });

  if (!application) {
    throw new AppError("No application found to reapply", 404);
  }

  if (application.status !== APPLICATION_STATUS.REJECTED) {
    throw new AppError("Only rejected applications can be reapplied", 400);
  }

  Object.assign(application, {
    ...payload,
    status: APPLICATION_STATUS.PENDING,
    rejectionReason: undefined,
    appliedAt: new Date(),
    approvedAt: undefined,
  });

  await application.save();

  await User.findByIdAndUpdate(userId, {
    applicationStatus: USER_APPLICATION_STATUS.PENDING,
  });

  return formatApplication(application);
};

export const getApplicationsForAdmin = async ({ status, search }) => {
  const filter = {};

  if (status && status !== "all") {
    filter.status = status;
  }

  let applications = await Application.find(filter)
    .populate("userId", "name email role applicationStatus")
    .sort({ appliedAt: -1 });

  if (search?.trim()) {
    const term = search.trim().toLowerCase();

    applications = applications.filter((app) => {
      const user = app.userId;
      return (
        app.businessName?.toLowerCase().includes(term) ||
        user?.name?.toLowerCase().includes(term) ||
        user?.email?.toLowerCase().includes(term) ||
        app.partnerType?.toLowerCase().includes(term)
      );
    });
  }

  const counts = await Application.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const countMap = {
    all: await Application.countDocuments(),
    pending: 0,
    approved: 0,
    rejected: 0,
  };

  counts.forEach(({ _id, count }) => {
    countMap[_id] = count;
  });

  return {
    counts: countMap,
    applications: applications.map(formatApplication),
  };
};
