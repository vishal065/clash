import { z } from "zod";

export const clashValidationSchema = z.object({
  title: z
    .string({ message: "name is required" })
    .min(3, { message: "Name must be 3 character long" }),
  description: z.string({ message: "Email is required" }).min(20).max(400),
  expire_At: z.string().min(5),
  image: z.string(),
});
