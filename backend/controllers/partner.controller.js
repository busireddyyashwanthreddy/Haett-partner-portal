import asyncHandler from "../utils/asyncHandler.js";
import * as partnerService from "../services/partner.service.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const data = await partnerService.getPartnerDashboard(
    req.user._id,
    req.user.role,
  );
  res.status(200).json({ success: true, data });
});
