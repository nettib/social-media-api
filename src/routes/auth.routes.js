import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { fileUrl, upload } from "../middlewares/fileUpload.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", upload.single("profile_picture"), fileUrl, signUp);
authRouter.post("/sign-in", signIn);


export default authRouter;
