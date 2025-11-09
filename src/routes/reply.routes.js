import { Router } from "express";
import { getReplies, getReply, leaveLikeReply, likeReply, removeReply, replyToComment, updateReply } from "../controllers/reply.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership.middleware.js";

const replyRouter = Router({ mergeParams: true });

replyRouter.get("/", getReplies);
replyRouter.get("/:replyId", getReply);
replyRouter.post("/", authenticate, replyToComment);
replyRouter.post("/:replyId/likes", authenticate, likeReply);
replyRouter.delete("/:replyId/likes", authenticate, leaveLikeReply);
replyRouter.put("/:replyId", authenticate, checkCommentOwnership, updateReply);
replyRouter.delete("/:replyId", authenticate, checkCommentOwnership, removeReply);

export default replyRouter;
