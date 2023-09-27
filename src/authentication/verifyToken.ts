import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { auth } = req.headers;
  try {
    jwt.verify(String(auth), "secret-key");
    next();
  } catch (error) {
    res.status(500).json("unautharized");
  }
};
