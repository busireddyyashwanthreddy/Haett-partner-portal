import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.model.js";
import Application from "../models/Application.model.js";
import DiscountCode from "../models/DiscountCode.model.js";
import {
  APPLICATION_STATUS,
  ROLES,
  USER_APPLICATION_STATUS,
} from "../utils/constants.js";
import { createPartnerDiscountCode } from "../services/discountCode.service.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is required in .env");
  process.exit(1);
}

const seedUsers = [
  {
    name: "Haett Admin",
    email: "admin@haett.com",
    password: "Admin123",
    role: ROLES.ADMIN,
    applicationStatus: USER_APPLICATION_STATUS.NONE,
  },
  {
    name: "Pending Partner",
    email: "pending@haett.com",
    password: "Partner123",
    role: ROLES.USER,
    applicationStatus: USER_APPLICATION_STATUS.PENDING,
    application: {
      partnerType: "influencer",
      businessName: "Pending Wellness Co",
      phone: "+1-555-0101",
      website: "https://pending-wellness.example.com",
      socialLink: "https://instagram.com/pendingwellness",
      audienceSize: "10k-50k",
      description: "Health-focused influencer promoting clean nutrition.",
      status: APPLICATION_STATUS.PENDING,
    },
  },
  {
    name: "Approved Partner",
    email: "approved@haett.com",
    password: "Partner123",
    role: ROLES.PARTNER,
    applicationStatus: USER_APPLICATION_STATUS.APPROVED,
    application: {
      partnerType: "retailer",
      businessName: "Approved Health Store",
      phone: "+1-555-0102",
      website: "https://approved-health.example.com",
      socialLink: "https://instagram.com/approvedhealth",
      audienceSize: "50k+",
      description: "Retail partner with established customer base.",
      status: APPLICATION_STATUS.APPROVED,
      approvedAt: new Date(),
    },
    seedCodes: true,
  },
  {
    name: "Rejected Partner",
    email: "rejected@haett.com",
    password: "Partner123",
    role: ROLES.USER,
    applicationStatus: USER_APPLICATION_STATUS.REJECTED,
    application: {
      partnerType: "blogger",
      businessName: "Rejected Blog",
      phone: "+1-555-0103",
      website: "https://rejected-blog.example.com",
      audienceSize: "1k-5k",
      description: "Blog application missing sufficient audience metrics.",
      status: APPLICATION_STATUS.REJECTED,
      rejectionReason:
        "Audience size and promotion plan do not meet minimum partner requirements.",
    },
  },
];

const runSeed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  await Promise.all([
    User.deleteMany({}),
    Application.deleteMany({}),
    DiscountCode.deleteMany({}),
  ]);

  console.log("Cleared existing data");

  for (const entry of seedUsers) {
    const { application, seedCodes, ...userData } = entry;
    const user = await User.create(userData);

    if (application) {
      const appDoc = await Application.create({
        userId: user._id,
        ...application,
        appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      });

      if (seedCodes) {
        await createPartnerDiscountCode({
          applicationId: appDoc._id,
          partnerId: user._id,
          discountValue: 20,
        });

        const extraCode = await createPartnerDiscountCode({
          applicationId: appDoc._id,
          partnerId: user._id,
          discountType: "fixed",
          discountValue: 10,
        });

        extraCode.usageCount = 42;
        extraCode.customerSavings = 840;
        await extraCode.save();
      }
    }

    console.log(`Seeded: ${user.email} (${user.role})`);
  }

  console.log("\nSeed complete. Test credentials:");
  console.log("Admin:   admin@haett.com / Admin123");
  console.log("Pending: pending@haett.com / Partner123");
  console.log("Approved: approved@haett.com / Partner123");
  console.log("Rejected: rejected@haett.com / Partner123");

  await mongoose.disconnect();
};

runSeed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
