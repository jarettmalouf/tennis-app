import { RequestHandler, Router } from "express";
import {
  createPrediction,
  getPredictions,
} from "../controllers/predictionController";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/",
  authMiddleware as RequestHandler,
  createPrediction as RequestHandler
);
router.get(
  "/:userId",
  authMiddleware as RequestHandler,
  getPredictions as RequestHandler
);

export default router;
