import { ZodError, ZodIssue } from "zod";

export const zodFormatError = (error: ZodError) => {
  let errors: any = {};
  error.errors.map((issue: ZodIssue) => {
    errors[issue.path?.[0]] = issue.message;
  });
  return errors;
};
