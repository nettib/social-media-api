import { Router } from "express";
import { 
         getAllPosts, 
         getSpecificpost, 
         createPost, 
         updatePost, 
         deletePost
        } from "../controllers/post.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
import { checkPostOwnership } from "../middlewares/checkPostOwnership.middleware.js";
import likeRouter from "./like.routes.js";
import commentRouter from "./comment.route.js";


const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:postId", getSpecificpost); 

postRouter.post("/", authorize, createPost);
postRouter.put("/:postId", authorize, checkPostOwnership, updatePost); 
postRouter.delete("/:postId", authorize, checkPostOwnership, deletePost); 

postRouter.use("/:postId/like", likeRouter); 
postRouter.use("/:postId/comment", commentRouter); 
export default postRouter;


