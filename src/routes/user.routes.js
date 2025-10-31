import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { deleteUser, followUser, getAllUsers, getFollowers, getFollowing, getMyPosts, getUser, unfollowUser, updateProfile } from "../controllers/user.controller.js";
import { checkAccountOwnership } from "../middlewares/checkAccountOwnership.middleware.js";

const userRouter = Router();

userRouter.get("/me/posts", authenticate, getMyPosts);

//Follow System

userRouter.get("/", authenticate, authorize, getAllUsers); //get all users
userRouter.get("/:userId", authenticate, getUser); //get specific user
userRouter.get("/:userId/followers", authenticate, getFollowers);
userRouter.get("/:userId/following", authenticate, getFollowing);

userRouter.post("/:userId/follow", authenticate, followUser);
userRouter.put("/:userId", authenticate, checkAccountOwnership, updateProfile); //update profile
userRouter.delete("/:userId/follow", authenticate, unfollowUser);
userRouter.delete("/:userId", authenticate, checkAccountOwnership, deleteUser); //delete user

export default userRouter;

