import { Router } from "express";
import AuthRoutes from "./AuthRoutes.js";
import { appLimiter, authLimiter } from "../config/rateLimit.js";
import clashRoute from "./ClashRoutes.js";
const router = Router();

router.use("/api/auth", authLimiter, AuthRoutes);
router.use("/api/clash", appLimiter, clashRoute);

export default router;
