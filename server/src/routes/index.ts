import { Router } from "express";
import AuthRoutes from "./AuthRoutes.js";
const router = Router();

router.use("/api/auth", AuthRoutes);

export default router;
