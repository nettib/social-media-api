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

