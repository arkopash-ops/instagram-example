import express from "express";
import cors from "cors";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import userRoute from "./routes/user.routes"
import profileRoute from "./routes/profile.routes"

const app = express();

app.use(loggerMiddleware)
app.use(cors());
app.use(express.json());

// routes
app.use("/user", userRoute);
app.use("/profile", profileRoute);

app.use(errorMiddleware);

export default app;
