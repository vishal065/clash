import { Request, Response, NextFunction } from "express";

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => any
) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default asyncHandler;
