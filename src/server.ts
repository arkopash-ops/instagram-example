import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db";
import app from "./app";

connectDB();

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
