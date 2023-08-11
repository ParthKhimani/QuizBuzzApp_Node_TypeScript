import { Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.log(err.message);
  res.status(500).json({
    msg: err.message,
    stack: err.stack,
  });
};
