import { RequestHandler, Router } from "express";
import {
  changePassword,
  deleteAccount,
  getProfile,
  updateProfile,
} from "../controllers/profileController";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware as RequestHandler, getProfile as RequestHandler);
router.put(
  "/",
  authMiddleware as RequestHandler,
  updateProfile as RequestHandler
);
router.put(
  "/password",
  authMiddleware as RequestHandler,
  changePassword as RequestHandler
);
router.delete(
  "/",
  authMiddleware as RequestHandler,
  deleteAccount as RequestHandler
);

export default router;
