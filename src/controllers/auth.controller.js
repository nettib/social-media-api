import { signInService, signUpService } from "../services/auth.service.js";


export const signUp = async (req, res, next) => {

    try {
        const { name, username, email, password, bio, role } = req.body;

        if (!name || !username || !email || !password) {
            const error = new Error("Please fill required essentials");
            error.status = 400;
            throw error;
        }

        let profilePicture = null;
        if (req.file) {
            let url = `profileUploads/${req.file.filename}`;
            req.file.url = url;
            profilePicture = {
                ImageName: req.file.filename,
                originalName: req.file.originalname,
                url: req.file.url,
                size: req.file.size,
                ImageType: req.file.mimetype
            };
        }

        const data = await signUpService({ name, username, email, password, role, profilePicture, bio });

        res.status(201).json({ success: true, message: "Signed up successfully", data });
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

        const { token, data } = await signInService({ username, password });

        res.status(200).json({ success: true, message: "Signed in successfully", token, data });
    } catch(error) {
        next(error);
    }
};

