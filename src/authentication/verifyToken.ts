import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  try {
    jwt.verify(token, "secret-key");
    next();
  } catch (error) {
    res.status(500).json("unautharized");
  }
};
