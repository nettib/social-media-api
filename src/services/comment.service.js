import Comment from "../model/comment.model.js";
import Post from "../model/post.model.js";


export const getCommentById = async (id) => {
    try {
        const comment = await Comment.findById(id);
    
        if (!comment) {
            const error = new Error("The comment is not found");
            error.status = 404;
            throw error;
        }

        return comment;
    } catch(error) {
        throw error;
    }
}


export const getCommentService = async(commentId) => {
    try {
        const comment = await Comment.findById(commentId)
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
        if (!comment) {
            const error = new Error("Comment not found");
            error.status = 404;
            throw error;
        }
        return comment 
    } catch(error) {
        throw error;
    }
}
export const getCommentsService = async(postId, page, limit, sort) => {
    try {
        let sortOption = {};
        if (sort === "latest") sortOption = { createdAt: -1 }
        else if(sort === "oldest") sortOption = { createdAt: 1}
        else if (sort === "popular") sortOption = { likesCount: -1}
        const totalComments = await Comment.countDocuments({ postId });
        const comments = await Comment.find({ postId })
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

        if (!comments) {
            const error = new Error("Comment not found");
            error.status = 404;
            throw error;
        }
        return { totalComments, totalPages: Math.ceil(totalComments / limit), comments } 
    } catch(error) {
        throw error;
    }
}


export const commentPostService = async (postId, author, content) => {
    try {
        const comment = new Comment({ postId, author, content });
        await comment.save();

        
        const post = await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } }, { new: true });

        if (!post) {
            const error = new Error("The post is not found");
            error.status = 404;
            throw error;
        }

        return comment
        
    } catch(error) {
        throw error;
    }
}


export const updateCommentService = async (comment, content) => {
    try {

        comment.content = content;

        const updatedComment  = await comment.save();

        return updatedComment;

    } catch(error) {
        throw error;
    }
}

export const uncommentPostService = async (postId, commentId, comment) => {
    try {
        const post = await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } }, { new: true });

        if (!post) {
            const error = new Error("The post is not found");
            error.status = 404;
            throw error;
        }

        await comment.deleteOne();

        return { message: "Deleted the comment successfully" }

    } catch(error) {
        throw error;
    }
}

export const likeCommentService = async (commentId, user) => {
    try {
        const comment = await Comment.findById(commentId);

        if(!comment) {
            const error = new Error("Comment not found");
            error.status = 404;
            throw error;
        }

        
        if (!comment.likes.includes(user.id)) {
            comment.likes.push(user.id);
            comment.likesCount += 1;
            await comment.save();
        }

        return comment;
    } catch(error) {
        throw error;
    }
}

export const leaveLikeService = async (commentId, user) => {
    try {
        const comment = await Comment.findById(commentId);

        if(!comment) {
            const error = new Error("Comment not found");
            error.status = 404;
            throw error;
        }

        
        if (comment.likes.includes(user.id)) {
            comment.likes = comment.likes.filter(id => id.toString() !== user.id);
            comment.likesCount = comment.likes.length;
            await comment.save();
        } 

        return comment
    } catch(error) {
        throw error;
    }
}