import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export interface AuthRequest extends Request {
  _id?: string;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Extract token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: "No token provided. You are unauthorized." });
  }

  // Verify token
  jwt.verify(
    token,
    process.env.JWT_KEY!,
    (err: JsonWebTokenError | null, data: any) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          return res.status(401).send({ message: "Token expired. Please log in again." });
        }
        return res.status(401).send({ message: "Invalid token. You are unauthorized." });
      }

      // Attach user ID to the request object
      req._id = data._id;
      next();
    }
  );
};
