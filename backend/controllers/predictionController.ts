import { Request, Response } from "express";

import Prediction from "../models/Prediction";

export const createPrediction = async (req: Request, res: Response) => {
  try {
    const { tournamentId, picks } = req.body;

    // Log the request user object to debug
    console.log("Request user:", (req as any).user);

    // Make sure we have a valid user ID
    if (!(req as any).user || !(req as any).user.id) {
      return res.status(401).json({ error: "User ID not found in request" });
    }

    const prediction = await Prediction.create({
      user: (req as any).user.id,
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
