import Comment from "../model/comment.model.js";
// import Post from "../model/post.model.js";


// export const getCommentById = async (id) => {
//     try {
//         const comment = await Comment.findById(id);
    
//         if (!comment) {
//             const error = new Error("The comment is not found");
//             error.status = 404;
//             throw error;
//         }

//         return comment;
//     } catch(error) {
//         throw error;
//     }
// }


export const getReplyService = async(replyId) => {
    try {
        const reply = await Comment.findById(replyId)
                               .populate([
                                    {   
                                        path: "author",
                                        select: "_id name username"
                                    },
                                    {
                                        path: "likes",
                                        select: "_id name username"
                                    }
                                ]);
        if (!reply) {
            const error = new Error("Reply not found");
            error.status = 404;
            throw error;
        }
        return reply
    } catch(error) {
        throw error;
    }
}


export const getRepliesService = async(parentComment, page, limit, sort) => {
    try {
        let sortOption = {};
        if (sort === "latest") sortOption = { createdAt: -1 }
        else if(sort === "oldest") sortOption = { createdAt: 1}
        else if (sort === "popular") sortOption = { likesCount: -1}
        const totalReplies = await Comment.countDocuments({ parentComment });
        const replies = await Comment.find({ parentComment })
                        .populate([
                            {   
                                path: "author",
                                select: "_id name username"
                            },
                            {
                                path: "likes",
                            select: "_id name username"
                            }
                        ])
                        .skip((page - 1) * limit)
                        .limit(limit)
                        .sort(sortOption);

        if (!replies) {
            const error = new Error("Reply not found");
            error.status = 404;
            throw error;
        }
        return { totalReplies, totalPages: Math.ceil(totalReplies / limit), replies } 
    } catch(error) {
        throw error;
    }
}


export const replyToCommentService = async (parentComment, author, content) => {
    try {
        const comment = new Comment({ parentComment, author, content });
        await comment.save();

        return comment
        
    } catch(error) {
        throw error;
    }
}


export const updateReplyService = async (reply, content) => {
    try {

        reply.content = content;

        const updatedReply  = await reply.save();

        return updatedReply;

    } catch(error) {
        throw error;
    }
}

export const removeReplyService = async (reply) => {
    try {
        await reply.deleteOne();

        return { message: "Deleted the comment successfully" }

    } catch(error) {
        throw error;
    }
}

export const likeReplyService = async (replyId, user) => {
    try {
        const reply = await Comment.findById(replyId);

        if(!reply) {
            const error = new Error("reply not found");
            error.status = 404;
            throw error;
        }

        if (!reply.likes.includes(user.id)) {
            reply.likes.push(user.id);
            reply.likesCount += 1;
            await reply.save();
        }

        return reply;
    } catch(error) {
        throw error;
    }
}

export const leaveLikeReplyService = async (replyId, user) => {
    try {
        const reply = await Comment.findById(replyId);

        if(!reply) {
            const error = new Error("Reply not found");
            error.status = 404;
            throw error;
        }

        
        if (reply.likes.includes(user.id)) {
            reply.likes = reply.likes.filter(id => id.toString() !== user.id);
            reply.likesCount = reply.likes.length;
            await reply.save();
        } 

        return reply
    } catch(error) {
        throw error;
    }
}