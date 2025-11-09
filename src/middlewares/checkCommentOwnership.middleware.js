import { getCommentById } from "../services/comment.service.js";

export const checkCommentOwnership = async (req, res, next) => {
    try {
        const { commentId, replyId } = req.params;


        const targetId = replyId || commentId;
        if(!targetId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const comment = await getCommentById(targetId);
        
        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, error: "You are not authenticated to perform this action"});
        }

        req.comment = comment;
        next();

    } catch(error) {
        next(error);
    }
}