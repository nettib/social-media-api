import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { commentPost, uncomment, updateComment } from "../controllers/comment.controller.js";
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership.midddleware.js";
// postRouter.post("/comment/:id", authorize, commentPost); //post id
// postRouter.put("/comment/:id", authorize, checkCommentOwnership, updateComment); //comment id
// postRouter.post("/uncomment/:id", authorize, checkCommentOwnership, uncomment); //comment id

const commentRouter = Router({ mergeParams: true });

commentRouter.post("/", authorize, commentPost);
commentRouter.put("/:commentId", authorize, checkCommentOwnership,updateComment);
commentRouter.delete("/:commentId", authorize, checkCommentOwnership, uncomment);

export default commentRouter;

