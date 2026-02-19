import { Router } from "express";
import * as postController from "../controllers/post.controller";

const route = Router();

route.post("/", postController._createPost);
route.get("/", postController._fetchAllPost);
route.get("/user/:userId", postController._fetchPostByUser);
route.patch("/:postId", postController._editPost);

export default route;
