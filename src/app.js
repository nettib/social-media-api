import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import connectToDB from "./database/mongodb.js";
import router from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/v1/", router);

// Error handler
app.use(errorHandler);

export default app;
