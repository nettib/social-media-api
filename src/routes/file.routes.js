import { Router } from "express";
import { downloadFile } from "../controllers/file.controller.js";

const fileRouter = Router();

fileRouter.get("/files/:fileId", downloadFile);

export default fileRouter;
