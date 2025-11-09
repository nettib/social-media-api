import { getRepliesService, getReplyService, leaveLikeReplyService, likeReplyService, removeReplyService, replyToCommentService, updateReplyService } from "../services/reply.service.js";


export const getReplies = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        let { page = 1, limit = 4, sort = "latest" } = req.query;
        if(!commentId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        page = Number(page);
        limit = Number(limit);
        const { totalReplies, totalPages, replies} = await getRepliesService(commentId, page, limit, sort);


        res.status(200).json({ success: true, page, totalPages, 
                               replies: totalReplies, likes: replies.likesCount, 
                               data: replies 
                            });
    } catch(error) {
        next(error);
    }
}


export const getReply = async (req, res, next) => {
    try {
        const replyId = req.params.replyId;
        if(!replyId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const reply = await getReplyService(replyId);

        res.status(200).json({ success: true, data: reply });
        
    } catch(error) {
        next(error);
    }
}



export const replyToComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const { content } = req.body;

        if(!commentId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        if (!content) {
            const error = new Error("No reply content");
            error.status = 400;
            throw error;
        }

        const reply = await replyToCommentService(commentId, req.user._id, content);

        res.status(201).json({ success: true, message: "You commented successfully", reply });

    } catch(error) {
        next(error);
    }
}

export const updateReply = async (req, res, next) => {
    try {
        const { content } = req.body;

        if(!content) {
            const error = new Error("No reply content");
            error.status = 404;
            throw error;
        }
        
        const updatedReply = await updateReplyService(req.comment, content);

        res.status(200).json({ success: true, reply: updatedReply });

    } catch(error) { 
        next(error);
    }
}

export const removeReply = async (req, res, next) => {
    try {
        const { message } = await removeReplyService(req.comment);

        res.status(200).json({ success: true, message });
        
    } catch(error) {
        next(error);
    }
}

export const likeReply = async (req, res, next) => {
    try {
        const replyId = req.params.replyId;
        if(!replyId) {
            const error = new Error("Bad request");
            error.status = 400
            throw error;
        }

        const reply = await likeReplyService(replyId, req.user);

        res.status(200).json({ success: true, reply });
    } catch(error) {
        next(error);
    }
}

export const leaveLikeReply = async (req, res, next) => {
    try {
        const replyId = req.params.replyId;
        if(!replyId) {
            const error = new Error("Bad request");
            error.status = 400
            throw error;
        }

        const reply = await leaveLikeReplyService(replyId, req.user);

        res.status(200).json({ success: true, reply, message: "Like removed successfully" });
    } catch(error) {
        next(error);
    }
}