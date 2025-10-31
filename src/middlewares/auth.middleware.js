import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../model/user.model.js";


export const authenticate = async (req, res, next) => {
    try { 
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            console.log("No token");
            return res.status(401).json({ success: false, error: "Unauthenticated" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            console.log("No decoded");
            return res.status(401).json({ success: false, error: "Unauthenticated" });
        }

        const { userId } = decoded;
        
        const user = await User.findById(userId);
        
        req.user = user;

        next();
        
    }catch(error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}

//make this like next(error)
export const authorize = async (req, res, next) => {
    try {
        if (!req.user) {
            const error = new Error("Bad request");
            error.status = 401;
            throw error;
        }

        if (req.user.role !== "admin") {
            const error = new Error("Forbidden: you are not authorized to do this action");
            error.status = 403;
            throw error;
        }
        
        next();
    } catch(error) {
        next(error);
    }
}