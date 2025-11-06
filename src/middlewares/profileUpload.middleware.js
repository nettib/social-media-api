import fs from "fs";
import path from "path";
import multer from "multer";


const profileUploadDir = path.join(process.cwd(), "profileUploads");

if (!fs.existsSync(profileUploadDir)) {
    fs.mkdirSync(profileUploadDir);
}


const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profileUploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const originalName = path.parse(file.originalname).name;
        const extension = path.extname(file.originalname);
        const fileName = `${originalName}(${uniqueSuffix})${extension}`;
        cb(null, fileName);
    }
})

export const profileUpload = multer({
    storage: profileStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = [
            // Images
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];

        if(!allowedFileTypes.includes(file.mimetype)) {
            cb(new Error("Invalid file type"));
        } else {
            cb(null, true);
        }
    }
})