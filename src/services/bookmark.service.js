import User from "../model/user.model.js";


export const getBookmarksService = async (userId) => {
    try {
        const user = await User.findById(userId)
                              .populate({
                                path: "bookmarks",
                                populate: [
                                    { 
                                        path: "author", 
                                        select: "_id username name" 
                                    }
                                ]
                              })
                              
        
        if(!user) {
            const error = new Error("User not found");
            error.status = 404;
            console.log(error);
            throw error;
        }

        return user.bookmarks;
    } catch(error) {
        throw error;
    }
} 
export const savePostsService = async (userId, postId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { $addToSet: { bookmarks: postId } }, { new: true });

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        return user.bookmarks;
    } catch(error) {
        throw error;
    }
}


export const removeFromBookmarksService = async (userId, postId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { $pull: { bookmarks: postId } }, { new: true });

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        return user.bookmarks;
    } catch(error) {
        throw error;
    }
}