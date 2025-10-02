import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../model/user.model.js";


export const authorize = async (req, res, next) => {
    try { 
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            console.log("No token");
            return res.status(401).json({ success: false, error: "Unauthorized" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            console.log("No decoded");
            return res.status(401).json({ success: false, error: "Unauthorized" });
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