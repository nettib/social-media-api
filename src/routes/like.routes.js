import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { getLikes, likePost, unlikePost } from "../controllers/like.controller.js";

const likeRouter = Router({ mergeParams: true });

// can be irrelavant to authorize the user here
likeRouter.get("/", getLikes);
likeRouter.post("/", authorize, likePost);
likeRouter.delete("/", authorize, unlikePost);

export default likeRouter;
