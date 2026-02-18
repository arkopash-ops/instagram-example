import { Router } from "express";
import * as profileController from "../controllers/profile.controller";

const route = Router();

route.post("/", profileController._createProfile);
route.get("/", profileController._fetchAllProfile);

export default route;
