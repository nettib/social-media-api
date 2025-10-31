import { getCommentById } from "../services/comment.service.js";

export const checkCommentOwnership = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
    
        if(!commentId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const comment = await getCommentById(commentId);
        
        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, error: "You are not authenticated to perform this action"});
        }

        req.comment = comment;
        next();

    } catch(error) {
        next(error);
    }
}