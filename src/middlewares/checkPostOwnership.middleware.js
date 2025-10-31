import { getPostById } from "../services/post.service.js";

export const checkPostOwnership = async (req, res, next) => {
    try {
        const postId = req.params.postId;
    
        if(!postId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const post = await getPostById(postId);
        
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, error: "You are not authenticated to perform this action"});
        }

        req.post = post;

        next();

    } catch(error) {
        next(error);
    }
}