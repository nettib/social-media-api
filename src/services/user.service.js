import fs from "fs";
import path from "path"; 
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import { ensureNotSelfAction } from "../utils/validation.js";


export const getAllUsersService = async (page, limit, sort) => {
    try {
        let sortOption;

        if (sort === "latest") sortOption = { createdAt: -1 };
        if (sort === "oldest") sortOption = { createdAt: 1 };

        const users = await User.find()
                                .select('-password')
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .sort(sortOption);

        return users;
    } catch(error) {
        throw error;
    }
}

export const getUserService = async (id) => {
    try {
        const user = await User.findById(id).select('-password');

        return user
    } catch(error) {
        throw error;
    }
}
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

export const updateProfileService = async (userId, requester, { name, username, email, password, bio, role, profileFile, removeProfilePicture }) => {
    try {
        const user = await User.findById(userId);

        if(!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        if(name) user.name = name;
        if(username) user.username = username;
        if(email) user.email = email;
        if(bio) user.bio = bio;

        if(role && requester.role === "admin") {
            user.role = role;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        if ((removeProfilePicture || profileFile) && user.profilePicture && user.profilePicture.url) {
            const oldFilePath = path.join(process.cwd(), user.profilePicture.url);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }


        if (removeProfilePicture) {
            user.profilePicture = null;
        } else if (profileFile) {
            user.profilePicture = {
                ImageName: profileFile.filename,
                originalName: profileFile.originalname, 
                url: profileFile.url,
                size: profileFile.size,
                ImageType: profileFile.mimetype
            }
        }

        console.log(profileFile);
        // console.log(user.profilePicture);
        await user.save();

        return user;

    } catch(error) {
        throw error;
    }
}

export const deleteUserService = async (userId) => {
    try {
        const user = await User.findById(userId);

         if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        if (user.profilePicture && user.profilePicture.url) {
            const oldFilePath = path.join(process.cwd(), user.profilePicture.url);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        await user.deleteOne();

        return { msg: "Deleted the user successfully" };
    } catch(error) {
        throw error;
    }
} 