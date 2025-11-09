import { commentPostService, updateCommentService, uncommentPostService, getCommentsService, getCommentService, likeCommentService, leaveLikeService } from "../services/comment.service.js";


export const getComments = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        let { page = 1, limit = 4, sort = "latest" } = req.query;
        if(!postId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        page = Number(page);
        limit = Number(limit);
        const { totalComments, totalPages, comments} = await getCommentsService(postId, page, limit, sort);


        res.status(200).json({ success: true, page, totalPages, comments: totalComments, likes: comments.likesCount, data: comments });
    } catch(error) {
        next(error);
    }
}

export const getComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        if(!commentId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const comment = await getCommentService(commentId);

        res.status(200).json({ success: true, data: comment });
        
    } catch(error) {
        next(error);
    }
}



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
        
        res.status(200).json({ success: true, message });
        
    } catch(error) {
        next(error);
    }
}

export const likeComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        if(!commentId) {
            const error = new Error("Bad request");
            error.status = 400
            throw error;
        }

        const comment = await likeCommentService(commentId, req.user);

        res.status(200).json({ success: true, comment });
    } catch(error) {
        next(error);
    }
}

export const leaveLike = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        if(!commentId) {
            const error = new Error("Bad request");
            error.status = 400
            throw error;
        }

        const comment = await leaveLikeService(commentId, req.user);

        res.status(200).json({ success: true, comment, message: "Like removed successfully" });
    } catch(error) {
        next(error);
    }
}