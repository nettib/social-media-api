
export const errorHandler = (err, req, res, next) => {
    try {

        let error = { ...err };

        // When token verification fails
        if (err.name === "JsonWebTokenError") {
            const message = "Invalid token";
            error = new Error(message);
            error.statusCode = 401;
        }
        
        if (err.name === "TokenExpiredError") {
            const message = "Token expired";
            error = new Error(message);
            error.statusCode = 401;
        }

        //Mongoose bad ObjectId
        if (err.name === "CastError") {
            const message = "Resource not found";
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key
        if (err.code === 11000) {
            const message = "Duplicate field value entered";
            error = new Error(message);
            error.statusCode = 400;
        }

        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(", "));
            error.statusCode = 400;
        }

        if (error) {
            return res.status(error.statusCode || 500).json({ success: false, error: error.message || "Internal server error" });
        }
    }  catch(error) {
        next(error);
    }
}

