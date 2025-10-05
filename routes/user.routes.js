import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { followUser, getFollowers, getFollowing, getMyPosts, unfollowUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/me/posts", authorize, getMyPosts);

//Follow System

userRouter.post("/:userId/follow", authorize, followUser);
userRouter.delete("/:userId/follow", authorize, unfollowUser);

userRouter.get("/:userId/followers", authorize, getFollowers);
userRouter.get("/:userId/following", authorize, getFollowing);

// userRouter.get("")

export default userRouter;

