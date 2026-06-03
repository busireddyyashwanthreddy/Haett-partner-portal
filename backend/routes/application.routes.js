import { Router } from "express";
import {
  getMyApplication,
  reapplyApplication,
  submitApplication,
} from "../controllers/application.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { applicationRules } from "../validators/application.validator.js";

const router = Router();

router.use(protect);

router.post("/", applicationRules, validate, submitApplication);
router.get("/me", getMyApplication);
router.put("/reapply", applicationRules, validate, reapplyApplication);

export default router;
