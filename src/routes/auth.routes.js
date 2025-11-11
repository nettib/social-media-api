import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { profileUpload } from "../middlewares/profileUpload.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", profileUpload.single("profile_picture"), signUp);
authRouter.post("/sign-in", signIn);

export default authRouter;
