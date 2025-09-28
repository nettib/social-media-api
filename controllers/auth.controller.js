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
        const { name, username, email, password, bio } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ success: false, error: "Please fill required essentials"});
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }]});
        if (existingUser) {
            return res.status(409).json({ success: false, error: "Username or email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, username, email, password: hashedPassword, bio });
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
            return res.status(400).json({ success: false, error: "Please fill all credentials"});
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found"});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ success: false, error: "Invalid password"});
        }

        const token = jwt.sign({ userId: user._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({ success: true, message: "Signed in successfully", data: sanitizeUser(user), token});
    } catch(error) {
        next(error);
    }
};

