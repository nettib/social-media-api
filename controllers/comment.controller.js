import { commentPostService, updateCommentService, uncommentPostService } from "../services/comment.service.js";


export const commentPost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const { content } = req.body;

        if(!postId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        if (!content) {
            const error = new Error("No comment content");
            error.status = 400;
            throw error;
        }

        const comment = await commentPostService(postId, req.user._id, content);

        res.status(201).json({ success: true, message: "You commented successfully", comment });

    } catch(error) {
        next(error);
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const { content } = req.body;

        if(!content) {
            const error = new Error("No comment content");
            error.status = 404;
            throw error;
        }
        
        
        const updatedComment = await updateCommentService(req.comment, content);

        res.status(200).json({ success: true, comment: updatedComment });

    } catch(error) { 
        next(error);
    }
}


export const uncomment = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        const { message } = await uncommentPostService(postId || req.comment.postId, commentId, req.comment);
        
        console.log(message);

        res.status(200).json({ success: true, message });
        
    } catch(error) {
        next(error);
    }
}