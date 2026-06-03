import DiscountCode from "../models/DiscountCode.model.js";
import generateDiscountCode from "../utils/generateDiscountCode.js";

const buildUniqueCode = async () => {
  let code = generateDiscountCode();
  let exists = await DiscountCode.findOne({ code });

  while (exists) {
    code = generateDiscountCode();
    exists = await DiscountCode.findOne({ code });
  }

  return code;
};

export const createPartnerDiscountCode = async ({
  applicationId,
  partnerId,
  discountType = "percentage",
  discountValue = 15,
}) => {
  const code = await buildUniqueCode();
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  return DiscountCode.create({
    applicationId,
    partnerId,
    code,
    discountType,
    discountValue,
    usageCount: 0,
    customerSavings: 0,
    active: true,
    expiryDate,
  });
};

export const getPartnerDiscountCodes = async (partnerId) =>
  DiscountCode.find({ partnerId }).sort({ createdAt: -1 });

export const getPartnerStats = async (partnerId) => {
  const codes = await DiscountCode.find({ partnerId });

  return {
    totalCodes: codes.length,
    totalUsage: codes.reduce((sum, c) => sum + c.usageCount, 0),
    customerSavings: codes.reduce((sum, c) => sum + c.customerSavings, 0),
  };
};
