import fs from "fs";
import path from "path";
import multer from "multer";
import { getFolderName } from "../utils/fileUtils.js";


const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = getFolderName(file.mimetype);

        const dir = path.join(uploadDir, folder)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const originalName = path.parse(file.originalname).name;
        const extension = path.extname(file.originalname);
        const fileName = `${originalName}(${uniqueSuffix})${extension}`;
        cb(null, fileName);
    }
})

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = [
            // Images
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            
            // Documents
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
            "application/zip",

            //videos
            "video/mp4",
            "video/webm",

           //audios
            "audio/mpeg",
            "audio/wav"
        ];

        if(!allowedFileTypes.includes(file.mimetype)) {
            cb(new Error("Invalid file type"));
        } else {
            cb(null, true);
        }
    }
})

export const fileUrl = (req, res, next) => {
    try {
        if (req.file && !req.files) {
            req.files = [req.file];
        }

        if (!req.files || req.files.length === 0) {
            return next();
        }

        req.files.forEach(file => {
            let folder = getFolderName(file.mimetype);
            
            let url = `uploads/${folder}/${file.filename}`;

            file.url = url;

        })

        next();
    } catch(error) {
        next(error);
    }
}