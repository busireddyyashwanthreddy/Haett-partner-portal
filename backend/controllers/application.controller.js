import asyncHandler from "../utils/asyncHandler.js";
import * as applicationService from "../services/application.service.js";

export const submitApplication = asyncHandler(async (req, res) => {
  const data = await applicationService.submitApplication(
    req.user._id,
    req.body,
  );
  res.status(201).json({ success: true, data });
});

export const getMyApplication = asyncHandler(async (req, res) => {
  const data = await applicationService.getMyApplication(req.user._id);
  res.status(200).json({ success: true, data });
});

export const reapplyApplication = asyncHandler(async (req, res) => {
  const data = await applicationService.reapplyApplication(
    req.user._id,
    req.body,
  );
  res.status(200).json({ success: true, data });
});
