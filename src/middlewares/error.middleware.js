
export const errorHandler = (err, req, res, next) => {
    try {
        if (err) {
            return res.status(err.status || 500).json({ success: false, error: err.message || "Internal server error" });
        }

        
    }  catch(error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}

