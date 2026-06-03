import asyncHandler from "../utils/asyncHandler.js";
import * as applicationService from "../services/application.service.js";
import * as adminService from "../services/admin.service.js";

export const getApplications = asyncHandler(async (req, res) => {
  const data = await applicationService.getApplicationsForAdmin({
    status: req.query.status,
    search: req.query.search,
  });
  res.status(200).json({ success: true, data });
});

export const approveApplication = asyncHandler(async (req, res) => {
  const data = await adminService.approveApplication(
    req.params.id,
    req.user._id,
  );
  res.status(200).json({ success: true, data });
});

export const rejectApplication = asyncHandler(async (req, res) => {
  const data = await adminService.rejectApplication(
    req.params.id,
    req.body.rejectionReason,
  );
  res.status(200).json({ success: true, data });
});
