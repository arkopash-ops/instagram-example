import { Router } from "express";
import * as postController from "../controllers/post.controller";
import { protect } from "../middlewares/auth.middleware";

const route = Router();

route.get("/", postController._fetchAllPost);

route.use(protect)

route.post("/", postController._createPost);
route.get("/user/:userId", postController._fetchPostByUser);
route.patch("/:postId", postController._editPost);
route.delete("/:postId", postController._deletePost);

export default route;
