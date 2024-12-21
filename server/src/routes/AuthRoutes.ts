import "dotenv/config.js";
import { Router } from "express";
import { register, verifyError } from "../controller/Auth/Auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify");
authRouter.post("/verify-error",verifyError);

export default authRouter;
