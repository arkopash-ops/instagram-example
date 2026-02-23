import { Router } from "express";
import * as userController from "../controllers/user.controller";

const route = Router();

route.post("/", userController._register);
route.get("/", userController._fetchAllRegisteredUser);

export default route;
