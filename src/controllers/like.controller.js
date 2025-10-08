import { getLikesService, likePostService, unlikePostService } from "../services/like.service.js";


export const likePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        console.log(req.params);

        if(!postId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const post = await likePostService(postId, req.user._id);
        
        console.log(post.likes);

        res.status(200).json({ success: true, message: "You liked this post" });
    } catch(error) {
         next(error);
    }
}

export const unlikePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;

        if(!postId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const post = await unlikePostService(postId, req.user._id);

        console.log(post);

        res.status(200).json({ success: true, message: "You unliked the post" });
    } catch(error) {
        next(error);
    }
}

export const getLikes = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        let { page = 1, limit = 10 } = req.query;

        if (!postId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }
        
        const { totalLikes, totalPages, data } = await getLikesService(postId, page, limit);

        res.status(200).json({ success: true, page, totalPages, likes: totalLikes, data });
    } catch(error) {
        next(error);
    }
}