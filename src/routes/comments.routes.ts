import { Router } from "express";
import * as commentController from "../controllers/comments.controller";
import { protect } from "../middlewares/auth.middleware";

const route = Router();

route.get("/", commentController._fetchAllComments);

route.use(protect);

route.post("/", commentController._createComment);
route.get("/post/:postId", commentController._fetchCommentsByPost);
route.patch("/:commentId", commentController._editComment);
route.delete("/:commentId", commentController._deleteComment);

export default route;
