import { Router } from "express";
import * as userController from "../controllers/user.controller";

const route = Router();

route.post("/", userController._createUser);
route.get("/", userController._fetchAllUser);

export default route;
