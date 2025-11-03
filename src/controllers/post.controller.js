import { getAllPostsService, getPostById, createPostService,updatePostService, deletePostService } from "../services/post.service.js";


export const getAllPosts = async (req, res, next) => {
    try {
        let { page = 1, limit = 4, user, search, sort = "latest" } = req.query;
        page = Number(page);
        limit = Number(limit);

        let filter = {};

        if(search) filter.content = { $regex: search, $options: "i" };

        const { totalPosts, totalPages, data } = await getAllPostsService(page, limit, user, sort, filter);

        res.status(200).json({ success: true, totalPosts, page, totalPages, posts: data });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

export const getSpecificpost = async (req, res, next) => {
    try {
        const postId = req.params.postId;

        if(!postId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const post = await getPostById(postId);

        res.status(200).json({ success: true, post });
    } catch(error) {
        console.log(error);
        next(error);
    }
}


export const createPost = async (req, res, next) => {
    try {
        const { content } = req.body;
        if (!content && (!req.files || req.files.length == 0)) {
            const error = new Error("No post content and files to be posted");
            error.status = 400;
            throw error;
        }

        const files = (req.files || []).map(file => ({
            fileName: file.filename,
            originalName: file.originalname,
            url: file.url,
            size: file.size,
            fileType: file.mimetype
        }));

        const post = await createPostService(req.user._id, content, files);
        res.status(201).json({ success: true, post });
    } catch(error) {
        next(error);
    }

};


export const updatePost = async (req, res, next) => {
    try { 
        console.log(req.files);
        const { content, removeFiles=[] } = req.body;
        console.log(removeFiles);
        if (!content && (!req.files || req.files.length == 0) && removeFiles.length == 0 ) {
            const error = new Error("No post content and files to be posted or deleted");
            error.status = 400;
            throw error;
        }
        
        const newFiles = (req.files || []).map(file => ({
            fileName: file.filename,
            originalName: file.originalname,
            url: file.url,
            size: file.size,
            fileType: file.mimetype
        }));

        const updatedPost = await updatePostService(req.post, content, newFiles, removeFiles);

        res.status(200).json({ success: true, post: updatedPost });
    } catch(error) {
        next(error);
    }
}


export const deletePost = async (req, res, next) => {
    try {

        const { msg } = await deletePostService(req.post);

        res.status(200).json({ success: true, message: msg });

    } catch(error) {
        next(error);
    }
}

