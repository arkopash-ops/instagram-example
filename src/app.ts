import express from "express";
import cors from "cors";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { erorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(loggerMiddleware)
app.use(cors());
app.use(express.json());
app.use(erorMiddleware);

export default app;
