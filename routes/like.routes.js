import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { likePost, unlikePost } from "../controllers/like.controller.js";

const likeRouter = Router({ mergeParams: true });

likeRouter.post("/", authorize, likePost);
likeRouter.delete("/", authorize, unlikePost);

export default likeRouter;
