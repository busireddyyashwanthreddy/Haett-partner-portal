import { Router } from "express";
import authRoutes from "./auth.routes.js";
import applicationRoutes from "./application.routes.js";
import adminRoutes from "./admin.routes.js";
import partnerRoutes from "./partner.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/applications", applicationRoutes);
router.use("/admin", adminRoutes);
router.use("/partner", partnerRoutes);

export default router;
