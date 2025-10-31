import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });
  const token = header.split(" ")[1];
  try {
    // @ts-ignore
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.userId = payload.id;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};
