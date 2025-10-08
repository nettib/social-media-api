import Post from "../model/post.model.js";
import User from "../model/user.model.js";

export const getAllPostsService = async (page, limit, name, sort, filter) => {
    try {
        if (name) {
            const user = await User.findOne({ name: name });
            if (user) {
                filter.author = user._id;
            } else {
                const error = new Error("User not found");
                error.status = 404;
                throw error;
            }
        }

        const totalPosts = await Post.countDocuments(filter);

        let sortOption = {}
        if(sort === "latest") sortOption = { createdAt: -1 }
        else if(sort === "oldest") sortOption = { createdAt: 1 }
        else if(sort === "popular") sortOption = { likesCount: -1 }


        const posts = await Post.find(filter)
                                .populate("author", "_id name username")
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .sort(sortOption);
        
        return { totalPosts, totalPages: Math.ceil(totalPosts / limit), data: posts };
    } catch(error) {
        throw error;
    }
}
export const getPostById = async (id) => {
    const post = await Post.findById(id);
    
    if (!post) {
        const error = new Error("The post is not found");
        error.status = 404;
        throw error;
    }

    return post;

}

export const createPostService = async (id, content) => {
    try {
        const post = new Post({ author: id, content });
        await post.save();

        return post;
    } catch(error) {
        throw error;
    }
}

export const updatePostService = async (post, content) => {
    try {
        post.content = content;

        const updatedPost = await post.save();

        return updatedPost;
    } catch(error) {
        throw error;
    }
}

export const deletePostService = async (post) => {
    try {
        await post.deleteOne();

        return { msg: "Deleted the post successfully" };
    } catch(error) {
        throw error;
    }
}