import authRouter from "./auth.routes.js";
import fileRouter from "./file.routes.js";
// import postRouter form './post.routes.js'
import postRouter from "./post.routes.js";
import userRouter from "./user.routes.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to Samra");
});

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/files", fileRouter);

export default router;
