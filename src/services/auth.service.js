import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


const sanitizeUser = (user) => {
    const { password, ...userInfo } = user.toObject();

    return userInfo;
} 


export const signUpService = async ({ name, username, email, password, role = "user", profilePicture, bio = "" }) => {
    try {
        
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            const error = new Error("Username or email already exists");
            error.status = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({ name, username, email, password: hashedPassword, role, profilePicture, bio });
        await user.save();

        return sanitizeUser(user);
        
        
    } catch(error) {
        throw error;
    }
};

export const signInService = async ({ username, password }) => {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            const error = new Error("Invalid password");
            error.status = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return { token, data: sanitizeUser(user) };
    } catch(error) {
        throw error;
    }
};

