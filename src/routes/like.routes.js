import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getLikes, likePost, unlikePost } from "../controllers/like.controller.js";

const likeRouter = Router({ mergeParams: true });


likeRouter.get("/", getLikes);
likeRouter.post("/", authenticate, likePost);
likeRouter.delete("/", authenticate, unlikePost);

export default likeRouter;
