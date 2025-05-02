import { RequestHandler, Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware";
import { savePrediction } from "../controllers/predictionController";

const router = Router();

router.post("/", (req, res, next) => {
  console.log("\n=== PREDICTION ROUTE HIT ===");
  console.log("Request body:", req.body);
  console.log("Request headers:", req.headers);
  console.log("=======================\n");

  authMiddleware(req, res, (err) => {
    if (err) {
      console.log("Auth middleware error:", err);
      return next(err);
    }
    console.log("Auth middleware passed");
    savePrediction(req, res, next);
  });
});

export default router;
