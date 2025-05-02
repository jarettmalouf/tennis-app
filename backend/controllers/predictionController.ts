import { NextFunction, Request, RequestHandler, Response } from "express";

import { AuthRequest } from "../types/auth";
import Prediction from "../models/Prediction";

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

export const getPredictions: RequestHandler = async (req, res, next) => {
  try {
    const { tournamentId } = req.query;
    if (!tournamentId || typeof tournamentId !== "string") {
      res.status(400).json({ error: "Tournament ID is required" });
      return;
    }

    const authReq = req as AuthRequest;
    if (!authReq.user?.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const predictions = await Prediction.find({
      user: authReq.user.userId,
      tournamentId,
    });

    res.json(predictions);
  } catch (error) {
    next(error);
  }
};

export const savePrediction: RequestHandler = async (req, res, next) => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user?.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { tournamentId, bracketData } = req.body;

    if (!tournamentId || !bracketData) {
      res
        .status(400)
        .json({ error: "Tournament ID and bracket data are required" });
      return;
    }

    const existingPrediction = await Prediction.findOne({
      user: authReq.user.userId,
      tournamentId,
    });

    if (existingPrediction) {
      existingPrediction.bracketData = bracketData;
      await existingPrediction.save();
      res.json(existingPrediction);
      return;
    }

    const prediction = new Prediction({
      user: authReq.user.userId,
      tournamentId,
      bracketData,
    });

    await prediction.save();
    res.status(201).json(prediction);
  } catch (error) {
    next(error);
  }
};
