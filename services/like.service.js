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

