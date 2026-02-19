import { Router } from "express";
import * as commentController from "../controllers/comments.controller";

const route = Router();

route.post("/", commentController._createComment);
route.get("/", commentController._fetchAllComments);
route.get("/post/:postId", commentController._fetchCommentsByPost);
route.patch("/:commentId", commentController._editComment);
route.delete("/:commentId", commentController._deleteComment);

export default route;
