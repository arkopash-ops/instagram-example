import { Router } from "express";
import * as commentController from "../controllers/comments.controller";

const route = Router();

route.post("/", commentController._createComment);
route.get("/", commentController._fetchAllComments);

export default route;
