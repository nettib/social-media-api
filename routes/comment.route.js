import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { commentPost, uncomment, updateComment } from "../controllers/comment.controller.js";
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership.middleware.js";

const commentRouter = Router({ mergeParams: true });

commentRouter.post("/", authorize, commentPost);
commentRouter.put("/:commentId", authorize, checkCommentOwnership,updateComment);
commentRouter.delete("/:commentId", authorize, checkCommentOwnership, uncomment);

export default commentRouter;

