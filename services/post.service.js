import Post from "../model/post.model.js";


export const getAllPostsService = async () => {
    try {
        const posts = await Post.find();

        return posts;
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