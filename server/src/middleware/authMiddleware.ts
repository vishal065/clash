import "dotenv/config.js";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const authmiddleware = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRECT_KEY!, (err, user) => {
      if (err) return res.status(401).json({ message: "unauthorized" });
      req.user = user as AuthUser;
      next();
    });
  }
);

export default authmiddleware;
