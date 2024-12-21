import { PrismaClient } from "@prisma/client";

const prismaInstance = new PrismaClient({
  log: ["error", "warn"],
  errorFormat: "pretty",
});

export default prismaInstance;
