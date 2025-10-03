import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { getMyPosts } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/me/posts", authorize, getMyPosts);

export default userRouter;

