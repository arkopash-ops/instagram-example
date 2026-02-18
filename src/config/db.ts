import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/myIG");
        console.log("Database connected");
    } catch (error) {
        console.error("DB connection error:", error);
        process.exit(1);
    }
};
