import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if(!DB_URI) {
    throw new Error("Please define the MongoDB_URI environment variable inside .env");
}

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to the database");
    } catch(error) {
        console.error("Error connecting to the database", error);
    }
};

export default connectToDB;

