import {
  getPredictions,
  savePrediction,
} from "../controllers/predictionController";

import { RequestHandler } from "express";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware as RequestHandler, getPredictions);
router.post("/", authMiddleware as RequestHandler, savePrediction);

export default router;
