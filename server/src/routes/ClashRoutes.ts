import { Router } from "express";
import authmiddleware from "../middleware/authMiddleware";

const clashRoute = Router();

clashRoute.get("/", authmiddleware );

export default clashRoute;
