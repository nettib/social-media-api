import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { commentPost, getComment, getComments, likeComment, uncomment, updateComment } from "../controllers/comment.controller.js";
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership.middleware.js";

const commentRouter = Router({ mergeParams: true });


commentRouter.get("/", getComments);
commentRouter.get("/:commentId", getComment);
// commentRouter.get("/:commentId", getCommentLikes);
commentRouter.post("/", authenticate, commentPost);
commentRouter.post("/:commentId/like", authenticate, likeComment);
commentRouter.put("/:commentId", authenticate, checkCommentOwnership,updateComment);
commentRouter.delete("/:commentId", authenticate, checkCommentOwnership, uncomment);

export default commentRouter;

