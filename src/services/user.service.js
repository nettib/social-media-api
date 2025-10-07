import mongoose from "mongoose";
import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import { ensureNotSelfAction } from "../utils/validation.js";

export const getMyPostsService = async (id) => {
    try {
        const posts = await Post.find({ author: id });

        return posts;
    } catch(error) {
        throw error;
    }
}

export const followUserService = async (userId, followUserId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        ensureNotSelfAction(userId, followUserId);
        
        const [user, followUser] = await Promise.all([
            User.findById(userId).session(session),
            User.findById(followUserId).session(session)
        ]);

         if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        
         if (!followUser) {
            const error = new Error("The user you want to follow is not found");
            error.status = 404;
            throw error;
        }
        
        user.following.addToSet(followUserId);
        followUser.followers.addToSet(userId);

        await Promise.all([user.save({ session }), followUser.save({ session })]);
        await session.commitTransaction();
        session.endSession();
        

        return user.following;
    } catch(error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}


export const unfollowUserService = async (userId, followUserId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        ensureNotSelfAction(userId, followUserId);
        
        const [user, followUser] = await Promise.all([
            User.findById(userId).session(session),
            User.findById(followUserId).session(session)
        ]);

         if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        
         if (!followUser) {
            const error = new Error("The user you want to follow is not found");
            error.status = 404;
            throw error;
        }
        
        user.following.pull(followUserId);
        followUser.followers.pull(userId);

        await Promise.all([user.save({ session }), followUser.save({ session })]);
        await session.commitTransaction();
        session.endSession();
        

        return user.following;
    } catch(error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

export const getFollowersSevice = async (userId) => {
    try {
        const user = await User.findById(userId).populate("followers", "_id name username");

        if (!user) {
            const error = new Error("User is not found");
            error.status = 404;
            throw error;
        }

        return user.followers;

    } catch(error) {
        throw error;
    }
}

export const getFollowingSevice = async (userId) => {
    try {
        const user = await User.findById(userId).populate("following", "_id name username");

        if (!user) {
            const error = new Error("User is not found");
            error.status = 404;
            throw error;
        }

        return user.following;

    } catch(error) {
        throw error;
    }
}
