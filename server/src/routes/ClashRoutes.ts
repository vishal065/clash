import { Router } from "express";
import authmiddleware from "../middleware/authMiddleware.js";
import {
  create,
  getAll,
  getById,
} from "../controller/Clash/clashController.js";

const clashRoute = Router();

clashRoute.post("/create", authmiddleware, create);
clashRoute.get("/getall", authmiddleware, getAll);
clashRoute.get("/get/:id", authmiddleware, getById);
clashRoute.get("/update/:id", authmiddleware, getById);

export default clashRoute;
