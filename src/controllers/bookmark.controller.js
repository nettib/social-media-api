import { getBookmarksService, removeFromBookmarksService, savePostsService } from "../services/bookmark.service.js";


export const getBookmarks = async (req, res, next) => {
    try {
            const bookmarks = await getBookmarksService(req.user._id);

            res.status(200).json({ success: true, data: bookmarks });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

export const savePosts = async (req, res, next) => {
    try {
        const postId = req.params.postId;

        if (!postId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const bookmarks = await savePostsService(req.user._id, postId);

        res.status(200).json({ success: true, bookmarks });
    } catch(error) {
        next(error);
    }
}


export const removeFromBookmarks = async (req, res, next) => {
    try {
        const postId = req.params.postId;

        if (!postId) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }

        const bookmarks = await removeFromBookmarksService(req.user._id, postId);

        res.status(200).json({ success: true, bookmarks })
    } catch(error) {
        next(error);
    }
}