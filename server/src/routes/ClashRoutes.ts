import { Router } from "express";
import authmiddleware from "../middleware/authMiddleware.js";
import {
  create,
  deleteByID,
  getAll,
  getById,
  update,
} from "../controller/Clash/clashController.js";
import { addClashItems } from "../controller/Clash/clashItemController.js";

const clashRoute = Router();

clashRoute.post("/create", authmiddleware, create);
clashRoute.get("/getall", authmiddleware, getAll);
clashRoute.get("/get/:id", getById);
clashRoute.put("/update/:id", authmiddleware, update);
clashRoute.delete("/delete/:id", authmiddleware, deleteByID);

//item Routes
clashRoute.post("/items/add", authmiddleware, addClashItems);

export default clashRoute;
