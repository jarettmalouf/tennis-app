import { RequestHandler, Router } from "express";
import { addFriend, login, signup } from "../controllers/userController";

const router = Router();

router.post("/signup", signup as RequestHandler);
router.post("/login", login as RequestHandler);
router.post("/add-friend", addFriend as RequestHandler);

export default router;
