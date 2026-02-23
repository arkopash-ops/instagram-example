import { Router } from "express";
import * as userController from "../controllers/user.controller";

const route = Router();

route.post("/register", userController._registerUser);
route.post("/login", userController._loginUser);
route.get("/", userController._fetchAllRegisteredUser);

export default route;
