import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "name is required" })
      .min(3, { message: "Name must be 3 character long" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Enter correct Email" }),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Confirm password not match",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
