import { Router } from "express";
import authmiddleware from "../middleware/authMiddleware.js";
import {
  create,
  deleteByID,
  getAll,
  getById,
  update,
} from "../controller/Clash/clashController.js";

const clashRoute = Router();

clashRoute.post("/create", authmiddleware, create);
clashRoute.get("/getall", authmiddleware, getAll);
clashRoute.get("/get/:id", authmiddleware, getById);
clashRoute.put("/update/:id", authmiddleware, update);
clashRoute.delete("/delete/:id", authmiddleware, deleteByID);

export default clashRoute;
