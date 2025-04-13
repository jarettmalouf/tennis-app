import { Request, Response } from "express";

import Prediction from "../models/Prediction";

export const createPrediction = async (req: Request, res: Response) => {
  try {
    const { tournamentId, picks } = req.body;
    const prediction = await Prediction.create({
      user: (req as any).user.id,
      tournamentId,
      picks,
    });
    res.status(201).json(prediction);
  } catch (err) {
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
