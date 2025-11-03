import { Router } from "express";
import { 
         getAllPosts, 
         getSpecificpost, 
         createPost, 
         updatePost, 
         deletePost
        } from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { checkPostOwnership } from "../middlewares/checkPostOwnership.middleware.js";
import likeRouter from "./like.routes.js";
import commentRouter from "./comment.route.js";
import { fileUrl, upload } from "../middlewares/fileUpload.middleware.js";


const postRouter = Router();

postRouter.get("/", getAllPosts); //admin
postRouter.get("/:postId", getSpecificpost); 

postRouter.post("/", authenticate, upload.array("files", 10), fileUrl, createPost);
postRouter.put("/:postId", authenticate, checkPostOwnership, upload.array("files", 10), fileUrl, updatePost); 
postRouter.delete("/:postId", authenticate, checkPostOwnership, deletePost); 

postRouter.use("/:postId/like", likeRouter); 
postRouter.use("/:postId/comment", commentRouter); 
export default postRouter;
