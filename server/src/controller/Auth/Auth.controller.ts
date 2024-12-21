import "dotenv/config.js";
import { Request, Response } from "express";
import { registerSchema } from "../../validation/AuthValidation.js";
import { v4 as uuid4 } from "uuid";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import prismaInstance from "../../config/database.js";
import { renderEmail } from "../../helper/EmailRender.js";
import { emailQueue, emailQueueName } from "../../jobs/EmailJob.js";
import { zodFormatError } from "../../helper/zodFormatError.js";
import asyncHandler from "../../utils/asyncHandler.js";

const register = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let payload: any = registerSchema.parse(data);

    let user = await prismaInstance.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (user) {
      res.status(422).json({
        errors: {
          email: "User already exist",
        },
      });
    }

    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);
    delete payload.confirm_password;

    const token = await bcrypt.hash(uuid4(), salt);
    const url = `${process.env.APP_URL}/verify?email=${payload.email}&token=${token}`;

    const emailBody = await renderEmail("email-verify", {
      name: payload.name,
      url,
    });

    // Send Email

    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "Email verification",
      body: emailBody,
    });

    await prismaInstance.user.create({
      data: { ...payload, email_verify_token: token },
    });
    return res.status(200).json({
      message: "Please check your email",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = zodFormatError(error);
      return res.status(422).json({ message: "invalid data", errors });
    }
    return res.status(500).json({ message: "something went wrong", error }); //server error
  }
});

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email, token } = req.query;
  if (!email || !token) {
    return res.redirect("/verify-error");
  }
  const user = await prismaInstance.user.findUnique({
    where: {
      email: email as string,
    },
  });
  if (!user) {
    return res.redirect("/verify-error");
  }
  if (user.email_verify_token === token) {
    await prismaInstance.user.update({
      data: {
        email_verify_token: null,
        email_verify_at: new Date().toISOString(),
      },
      where: {
        email: email as string,
      },
    });
    return res.redirect(`${process.env}/login`);
  }
});

const verifyError = asyncHandler(async (req, res) => {
  return res.render("auth/emailVerifyError");
});

export { register, verifyEmail, verifyError };
