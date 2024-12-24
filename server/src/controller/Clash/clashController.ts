import "dotenv/config.js";
import { Request, Response } from "express";
import {
  forgetPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../../validation/AuthValidation.js";
import { v4 as uuid4 } from "uuid";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import prismaInstance from "../../config/database.js";
import { renderEmail } from "../../helper/EmailRender.js";
import { emailQueue, emailQueueName } from "../../jobs/EmailJob.js";
import { zodFormatError } from "../../helper/zodFormatError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import moment from "moment";
import { clashValidationSchema } from "../../validation/ClashValidation.js";
import { UploadedFile } from "express-fileupload";
import { imageValidator } from "../../helper/imageValidator.js";

asyncHandler(async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = clashValidationSchema.parse(body);
    if (req.files?.image) {
      const image = req.files?.image as UploadedFile;
      const validMsg = imageValidator(image.size, image.mimetype);
      if (validMsg) {
        return res.status(422).json({ errors: { image: validMsg } });
      }
      payload.
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = zodFormatError(error);
      console.log("here ", errors);

      return res.status(422).json({ message: "invalid data", errors });
    }
    return res.status(500).json({ message: "something went wrong", error }); //server error
  }
});
