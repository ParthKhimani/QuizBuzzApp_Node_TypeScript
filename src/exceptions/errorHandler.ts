import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    msg: err.message,
    stack: err.stack,
  });
};
