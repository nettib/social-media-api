import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { commentPost, getComment, getComments, likeComment, uncomment, updateComment } from "../controllers/comment.controller.js";
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership.middleware.js";

const commentRouter = Router({ mergeParams: true });


commentRouter.get("/", getComments);
commentRouter.get("/:commentId", getComment);
// commentRouter.get("/:commentId", getCommentLikes);
commentRouter.post("/", authorize, commentPost);
commentRouter.post("/:commentId/like", authorize, likeComment);
commentRouter.put("/:commentId", authorize, checkCommentOwnership,updateComment);
commentRouter.delete("/:commentId", authorize, checkCommentOwnership, uncomment);

export default commentRouter;

