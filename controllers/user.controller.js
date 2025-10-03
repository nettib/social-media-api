import { getMyPostsService } from "../services/user.service.js";


export const getMyPosts = async (req, res, next) => {
    try {
        const posts = await getMyPostsService(req.user.id);

        res.status(200).json({ success: true, posts });
    } catch(error) {
        next(error);
    }
}