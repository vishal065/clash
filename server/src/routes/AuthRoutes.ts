import { Router, Request, Response } from "express";
import { registerSchema } from "../validation/AuthValidation.js";
import { ZodError } from "zod";
import { zodFormatError } from "../helper/zodFormatError.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const payload = registerSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      // if zod error
      const errors = zodFormatError(error);
      res.status(422).json({ message: "invalid data", errors });
      return;
    }
    res.status(500).json({ message: "something went wrong", error }); //server error
    return;
  }
});

export default router;
