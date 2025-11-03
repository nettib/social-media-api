import fs from "fs";
import path from "path";
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

export const createPostService = async (author, content, files) => {
    try {
        const post = new Post({ author, content, files });
        console.log(post);
        await post.save();

        return post;
    } catch(error) {
        throw error;
    }
}

export const updatePostService = async (post, content, newFiles, removeFiles) => {
    try {
        if (content) post.content = content;

        if (removeFiles.length > 0) {
            post.files = post.files.filter(file => {
                const shouldRemove = removeFiles.includes(file.url);
                const filePath = path.join(process.cwd(), file.url);
                if (shouldRemove && fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                return !shouldRemove
            })
        }

        if (newFiles) post.files.push(...newFiles);
 
        const updatedPost = await post.save();

        return updatedPost;
    } catch(error) {
        throw error;
    }
}

export const deletePostService = async (post) => {
    try {
        for (const file of post.files) {
            try {
                const filePath = path.join(process.cwd(), file.url);
                if(fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch(error) {
                console.log(`Error deleting file:`, file.url, error.message);
                const err = new Error("Internal server Error");
                err.status = 500;
                throw err;
            }
        };

        await post.deleteOne();

        return { msg: "Deleted the post successfully" };
    } catch(error) {
        throw error;
    }
}