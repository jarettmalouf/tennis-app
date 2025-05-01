import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  // Add any other fields that might be in your JWT payload
  username?: string;
  iat?: number;
  exp?: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Log the token for debugging (first few characters only)
    console.log("Received token:", token.substring(0, 10) + "...");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Log the decoded token for debugging
    console.log("Decoded token:", decoded);

    // Make sure we have a userId in the decoded token
    if (!decoded.userId) {
      console.error("No user ID found in token:", decoded);
      return res.status(401).json({ error: "Invalid token format" });
    }

    // Set the user ID in the request object
    (req as any).user = { id: decoded.userId };

    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};
