import authRouter from "./auth.routes.js";
// import postRouter form './post.routes.js'
import postRouter from "./post.routes.js";
import userRouter from "./user.routes.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to social media api");
});

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
