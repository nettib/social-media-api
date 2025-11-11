import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { deleteUser, followUser, getAllUsers, getFollowers, getFollowing, getMyPosts, getUser, unfollowUser, updateProfile } from "../controllers/user.controller.js";
import { checkAccountOwnership } from "../middlewares/checkAccountOwnership.middleware.js";
import { profileUpload } from "../middlewares/profileUpload.middleware.js";
import bookmarkRouter from "./bookmark.routes.js";

const userRouter = Router();

userRouter.get("/me/posts", authenticate, getMyPosts);

userRouter.use("/bookmarks", authenticate, bookmarkRouter);


userRouter.get("/", authenticate, authorize, getAllUsers); 
userRouter.get("/:userId", authenticate, getUser); 
userRouter.get("/:userId/followers", authenticate, getFollowers);
userRouter.get("/:userId/following", authenticate, getFollowing);
userRouter.post("/:userId/following", authenticate, followUser);
userRouter.put("/:userId", authenticate, checkAccountOwnership, profileUpload.single("profile_picture"), updateProfile); 
userRouter.delete("/:userId/following", authenticate, unfollowUser);
userRouter.delete("/:userId", authenticate, checkAccountOwnership, deleteUser); 


export default userRouter;

