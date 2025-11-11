import fs from "fs";
import path from "path";
import { getFileService } from "../services/file.service.js";

export const downloadFile = async (req, res, next) => {
    try {
        const fileId = req.params.fileId;

        if (!fileId) {
            const error = new Error("Bad Request");
            error.status = 400;
            throw error;
        }

        const file = await getFileService(fileId);
        const filePath = path.join(process.cwd(), file.url);

        if (!fs.existsSync(filePath)) {
            const error = new Error("file does not exist on the server");
            error.status = 404;
            throw error;
        }

        res.download(filePath, file.fileName, (err) => {
            if (err) next(err);
        });

    } catch(error) {
        next(error);
    }
}