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
import jwt from "jsonwebtoken";
import moment from "moment";

const register = asyncHandler(async (req: Request, res: Respons) => {
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
    const url = `${process.env.BACKEND_APP_URL}/api/auth/verify?email=${payload.email}&token=${token}`;

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
      console.log("here ", errors);

      return res.status(422).json({ message: "invalid data", errors });
    }
    return res.status(500).json({ message: "something went wrong", error }); //server error
  }
});

const login = asyncHandler(async (req, res) => {
  const data = req.body;

  try {
    let payload: any = loginSchema.parse(data);
    const user = await prismaInstance.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      res.status(422).json({
        errors: {
          email: "User do not exist",
        },
      });
    }
    const compare = await bcrypt.compare(payload.password, user?.password!);
    if (!compare) {
      res.status(422).json({
        errors: {
          email: "Invalid credentaials",
        },
      });
    }

    const jwtPayload = {
      id: user?.id,
      email: user?.email,
    };

    const token = jwt.sign(jwtPayload, process.env.SECRECT_KEY!, {
      expiresIn: "7d",
    });
    return res.json({
      message: "login successfully",
      data: {
        name: user?.name,
        token: `Bearer ${token}`,
        ...jwtPayload,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = zodFormatError(error);
      console.log("here ", errors);

      return res.status(422).json({ message: "invalid data", errors });
    }
    return res.status(500).json({ message: "something went wrong", error }); //server error
  }
});
const checkCredentials = asyncHandler(async (req, res) => {
  const data = req.body;

  try {
    let payload: any = loginSchema.parse(data);
    const user = await prismaInstance.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      res.status(422).json({
        errors: {
          email: "User do not exist",
        },
      });
    }
    const compare = await bcrypt.compare(payload.password, user?.password!);
    if (!compare) {
      res.status(422).json({
        errors: {
          email: "Invalid credentaials",
        },
      });
    }

    return res.json({
      message: "login successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = zodFormatError(error);

      return res.status(422).json({ message: "invalid data", errors });
    }
    return res.status(500).json({ message: "something went wrong", error }); //server error
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      return res.status(200).json({ data: user });
    }
  } catch (error) {
    console.error(error);
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
    return res.redirect(`${process.env.APP_URL}/login`);
  }
});

const verifyError = asyncHandler(async (_, res) => {
  return res.render("auth/emailVerifyError");
});

const sendEmailForgetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    try {
      const payload = forgetPasswordSchema.parse(data);

      const user = prismaInstance.user.findUnique({
        where: { email: payload.email },
      });

      if (!user) {
        return res.status(422).json({
          message: "Invalid data",
          errors: { email: "No user found" },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const token = await bcrypt.hash(uuid4(), salt);

      await prismaInstance.user.update({
        where: { email: payload.email },
        data: {
          password_reset_token: token,
          token_send_at: new Date().toISOString(),
        },
      });

      const url = `${process.env.APP_URL}/reset-password?email=${payload.email}&token=${token}`;

      const html = await renderEmail("forget-password", { url });

      await emailQueue.add(emailQueueName, {
        to: payload.email,
        subject: "Reset Password",
        body: html,
      });

      return res.status(200).json({
        message: "Password reset link send successfully please check your mail",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = zodFormatError(error);

        return res.status(422).json({ message: "invalid data", errors });
      }
      return res.status(500).json({ message: "something went wrong", error });
    }
  }
);

const checkDateHourDiff = (date: string): number => {
  const now = moment();

  const tokenSendAt = moment(date);
  const difference = moment.duration(now.diff(tokenSendAt));
  return difference.asHours();
};

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const payload = resetPasswordSchema.parse(body);

    const user = await prismaInstance.user.findUnique({
      where: { email: payload.email },
    });

    if (!user || user?.password_reset_token != payload.token) {
      return res.status(422).json({
        message: "Invalid data",
        errors: { email: "Link is not correct" },
      });
    }

    //check 2 hour time frame
    const hourDiff = checkDateHourDiff(String(user?.token_send_at));
    if (hourDiff > 2) {
      return res.status(422).json({
        message: "Invalid data",
        errors: { email: "password reset token expired" },
      });
    }

    //update password

    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(payload.password, salt);

    await prismaInstance.user.update({
      where: {
        email: payload.email,
      },
      data: {
        password: newPass,
        password_reset_token: null,
        token_send_at: null,
      },
    });

    return res.status(200).json({ message: "password reset successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = zodFormatError(error);

      return res.status(422).json({ message: "invalid data", errors });
    }
    return res.status(500).json({ message: "something went wrong", error });
  }
});

export {
  register,
  verifyEmail,
  verifyError,
  login,
  getUser,
  checkCredentials,
  resetPassword,
  sendEmailForgetPassword,
};
