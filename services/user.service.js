import Post from "../model/post.model.js";


export const getMyPostsService = async (id) => {
    try {
        const posts = await Post.find({ author: id });

        return posts;
    } catch(error) {
        throw error;
    }
}