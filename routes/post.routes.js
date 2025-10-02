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
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership.midddleware.js";
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

// postRouter.post("/comment/:id", authorize, commentPost); //post id
// postRouter.put("/comment/:id", authorize, checkCommentOwnership, updateComment); //comment id
// postRouter.post("/uncomment/:id", authorize, checkCommentOwnership, uncomment); //comment id


// postRouter.get("/getmypost", authorize, (req, res, next) => { console.log("Get someone his posts")});
// // Get All my Posts
// // Get my specific post


export default postRouter;

// Do for JWT EXPIRED