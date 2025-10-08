import Post from "../model/post.model.js";


export const likePostService = async (postId, userId) => {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            const error = new Error("The post is not found");
            error.status = 404;
            throw error;
        }

        if(post.likes.includes(userId)) {
            return post
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId }, $inc: { likesCount: 1 } }, { new: true });
        

        return updatedPost;
    } catch (error) {
        throw error;
    }
}

export const unlikePostService = async (postId, userId) => {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            const error = new Error("The post is not found");
            error.status = 404;
            throw error;
        }

        if(!post.likes.includes(userId)) {
            return post
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId }, $inc: { likesCount: -1 } }, { new: true });
        
        return updatedPost;
    } catch (error) {
        throw error;
    }
}

export const getLikesService = async (postId, page, limit) => {
    try {
        const post = await Post.findById(postId).populate({
            path: "likes", 
            select: "_id name username",
        });

        if (!post) {
            const error = new Error("Post not found");
            error.status = 404;
            throw error;
        }

        const totalLikes = post.likesCount;
        const totalPages = Math.ceil(totalLikes / limit);
        const start = (page - 1) * limit
        const end = start + limit;
        const PaginatedLikes = post.likes.slice(start, end);

        return { totalLikes, totalPages, data: PaginatedLikes };
    } catch(error) {
        throw error;
    }
} 

