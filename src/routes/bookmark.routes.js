import { Router } from "express";
import { getBookmarks, removeFromBookmarks, savePosts } from "../controllers/bookmark.controller.js";

const bookmarkRouter = Router({ mergeParams: true });

bookmarkRouter.get("/", getBookmarks);
bookmarkRouter.post("/:postId", savePosts);
bookmarkRouter.delete("/:postId", removeFromBookmarks);

export default bookmarkRouter;