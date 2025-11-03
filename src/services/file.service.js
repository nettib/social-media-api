import Post from "../model/post.model.js";

export const getFileService = async (fileId) => {
    try {
        const post = await Post.findOne({ "files._id": fileId });
        if (!post) {
            const error = new Error("File not found in any post");
            error.status = 404;
            throw error;
        }

        const file = post.files.id(fileId);
        return file;
    } catch(error) {
        throw error;
    }
}