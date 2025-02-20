import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default class ClientDB {
    
    public static connectDB = async () => {
        try {
            await mongoose.connect(process.env.DATABASE_URL as string, {});
            console.log("database connected");
        } catch (error) {
            console.error(`error in connect with database: ${error}`)
        }
    }
}