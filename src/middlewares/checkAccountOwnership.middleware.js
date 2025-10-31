

export const checkAccountOwnership = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        
        if(!userId || !req.user) {
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }
        if ((!(req.user._id.toString() === String(userId))) && req.user.role !== "admin") {
            const error = new Error("Forbidden: You are not authorized to do this action");
            error.status = 403;
            throw error;
        }
        
        next();
    } catch(error) {
        next(error);
    }
}