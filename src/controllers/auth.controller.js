import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


const sanitizeUser = (user) => {
    const { password, ...userInfo } = user.toObject();

    return userInfo;
} 


export const signUp = async (req, res, next) => {

    try {
        const { name, username, email, password, bio, role } = req.body;

        if (!name || !username || !email || !password) {
            const error = new Error("Please fill required essentials");
            error.status = 400;
            throw error;
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }]});
        if (existingUser) {
            const error = new Error("Username or email already exists");
            error.status = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, username, email, password: hashedPassword, bio, role });
        await user.save();

        res.status(201).json({ success: true, message: "Signed up successfully", data: sanitizeUser(user) });
        
        
    } catch(error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            const error = new Error("Please fill all credentials");
            error.status = 400;
            throw error;
        }

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

        res.status(200).json({ success: true, message: "Signed in successfully", token, data: sanitizeUser(user) });
    } catch(error) {
        next(error);
    }
};

