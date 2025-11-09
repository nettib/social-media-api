import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { commentPost, getComment, getComments, leaveLike, likeComment, uncomment, updateComment } from "../controllers/comment.controller.js";
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership.middleware.js";
import replyRouter from "./reply.routes.js";

const commentRouter = Router({ mergeParams: true });


commentRouter.get("/", getComments);
commentRouter.get("/:commentId", getComment);
commentRouter.post("/", authenticate, commentPost);
commentRouter.post("/:commentId/like", authenticate, likeComment);
commentRouter.delete("/:commentId/like", authenticate, leaveLike);
commentRouter.put("/:commentId", authenticate, checkCommentOwnership, updateComment);
commentRouter.delete("/:commentId", authenticate, checkCommentOwnership, uncomment);


commentRouter.use("/:commentId/reply", replyRouter);
export default commentRouter;


