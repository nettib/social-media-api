import { getAllUsersService ,getMyPostsService, followUserService, getFollowersSevice, getFollowingSevice, getUserService, updateProfileService, deleteUserService } from "../services/user.service.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();

        res.status(200).json({ success: true, users });
    } catch(error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        if(!userId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }
        const user = await getUserService(userId);

        res.status(200).json({ success: true, user });
    } catch(error) {
        next(error);
    }
}
export const getMyPosts = async (req, res, next) => {
    try {
        const posts = await getMyPostsService(req.user.id);

        res.status(200).json({ success: true, posts });
    } catch(error) {
        next(error);
    }
}

export const followUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const following = await followUserService(req.user._id, userId);

        res.status(200).json({ success: true, message: "User followed successfully", data: following });

    } catch(error) {
        next(error);
    }
}

export const unfollowUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const following = await unfollowUserService(req.user._id, userId);

        res.status(200).json({ success: true, message: "User unfollowed successfully", data: following });

    } catch(error) {
        next(error);
    }
}

export const getFollowers = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const followers = await getFollowersSevice(userId);

        console.log(followers);


        res.status(200).json({ success: true, followers });
    } catch(error) {
        next(error);
    }
}


export const getFollowing = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const following = await getFollowingSevice(userId);


        res.status(200).json({ success: true, following });
    } catch(error) {
        next(error);
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const { name, username, email, password, bio, role } = req.body;
        const userId = req.params.userId;
        if(!userId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        
        const user = await updateProfileService(userId, req.user, { name, username, email, password, bio, role });

        res.status(200).json({ success: true, user });
    } catch(error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        if(!userId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const { msg } = await deleteUserService(userId);

        res.status(200).json({ success: true, message: msg });
    } catch(error) {
        next(error);
    }
}