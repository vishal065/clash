import "dotenv/config.js";
import { Router } from "express";
import {
  checkCredentials,
  getUser,
  login,
  register,
  verifyEmail,
  verifyError,
} from "../controller/Auth/Auth.controller.js";
import authmiddleware from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/check/credentials", checkCredentials);
authRouter.get("/verify?", verifyEmail);
authRouter.get("/verify-error", verifyError);
authRouter.get("/user", authmiddleware, getUser);

export default authRouter;
