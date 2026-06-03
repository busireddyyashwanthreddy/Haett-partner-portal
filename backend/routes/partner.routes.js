import { Router } from "express";
import { getDashboard } from "../controllers/partner.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);
router.get("/dashboard", getDashboard);

export default router;
