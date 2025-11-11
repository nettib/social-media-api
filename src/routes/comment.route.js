import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { commentPost, getComment, getComments, leaveLike, likeComment, uncomment, updateComment } from "../controllers/comment.controller.js";
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership.middleware.js";
import replyRouter from "./reply.routes.js";

const commentRouter = Router({ mergeParams: true });


commentRouter.use("/:commentId/replies", replyRouter);

commentRouter.get("/", getComments);
commentRouter.get("/:commentId", getComment);
commentRouter.post("/", authenticate, commentPost);
commentRouter.post("/:commentId/likes", authenticate, likeComment);
commentRouter.delete("/:commentId/likes", authenticate, leaveLike);
commentRouter.put("/:commentId", authenticate, checkCommentOwnership, updateComment);
commentRouter.delete("/:commentId", authenticate, checkCommentOwnership, uncomment);

export default commentRouter;


