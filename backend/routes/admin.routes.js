import { Router } from "express";
import {
  approveApplication,
  getApplications,
  rejectApplication,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { rejectRules } from "../validators/admin.validator.js";

const router = Router();

router.use(protect, adminOnly);

router.get("/applications", getApplications);
router.post("/applications/:id/approve", approveApplication);
router.post(
  "/applications/:id/reject",
  rejectRules,
  validate,
  rejectApplication,
);

export default router;
