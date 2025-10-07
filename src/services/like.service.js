import Post from "../model/post.model.js";


export const likePostService = async (postId, userId) => {
    try {
        const post = await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } }, { new: true });
        
        if (!post) {
            const error = new Error("The post is not found");
            error.status = 404;
            throw error;
        }

        return post;
    } catch (error) {
        throw error;
    }
}

export const unlikePostService = async (postId, userId) => {
    try {
        const post = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId }}, { new: true });
        
        if (!post) {
            const error = new Error("The post is not found");
            error.status = 404;
            throw error;
        }

        return post;
    } catch (error) {
        throw error;
    }
}

export const getLikesService = async (postId) => {
    try {
        const post = await Post.findById(postId).populate("likes", "_id name username");

        if (!post) {
            const error = new Error("Post not found");
            error.status = 404;
            throw error;
        }

        return post.likes;
    } catch(error) {
        throw error;
    }
} 

