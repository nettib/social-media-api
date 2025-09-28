import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import connectToDB from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Welcome to social media api");
});

app.listen(PORT, async () => {
    console.log(`Listening to the server at port ${PORT}`);
    await connectToDB();
});