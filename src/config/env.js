import { config } from "dotenv";

config({ path: ".env" });

export const { 
    PORT = 5000, 
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN
 } = process.env;