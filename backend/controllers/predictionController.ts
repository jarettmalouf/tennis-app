import { NextFunction, Request, Response } from "express";

import Prediction from "../models/Prediction";

// Extend Express Request type to include user
interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const createPrediction = async (req: Request, res: Response) => {
  try {
    const { tournamentId, picks } = req.body;

    // Log the request user object to debug
    console.log("Request user:", (req as any).user);

    // Make sure we have a valid user ID
    if (!(req as any).user || !(req as any).user.userId) {
      return res.status(401).json({ error: "User ID not found in request" });
    }

    const prediction = await Prediction.create({
      user: (req as any).user.userId,
      tournamentId,
      picks,
    });
    res.status(201).json(prediction);
  } catch (err) {
    console.error("Prediction creation error:", err);
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getPredictions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const predictions = await Prediction.find({ user: userId });
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const savePrediction = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("Received prediction request:", {
      body: req.body,
      user: req.user,
    });

    const { tournamentId, picks } = req.body;

    if (!req.user?.userId) {
      console.log("No user ID found in request");
      res.status(401).json({ error: "User ID not found in request" });
      return;
    }

    console.log("Creating prediction with data:", {
      user: req.user.userId,
      tournamentId,
      picks,
    });

    const prediction = new Prediction({
      user: req.user.userId,
      tournamentId,
      picks,
    });

    const savedPrediction = await prediction.save();
    console.log("Successfully saved prediction:", savedPrediction);

    res.status(201).json({ message: "Prediction saved successfully" });
  } catch (error) {
    console.error("Error saving prediction:", error);
    res.status(500).json({ error: "Failed to save prediction" });
  }
};
