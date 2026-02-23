import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as postController from "../controllers/post.controller";

const route = Router();

route.post("/register", userController._registerUser);
route.post("/login", userController._loginUser);
route.get("/", userController._fetchAllRegisteredUser);

route.get("/:userId/posts", postController._fetchPostByUser);

export default route;
