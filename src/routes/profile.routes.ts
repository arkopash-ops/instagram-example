import { Router } from "express";
import * as profileController from "../controllers/profile.controller";
import { protect } from "../middlewares/auth.middleware";

const route = Router();

route.get("/", profileController._fetchAllProfile);

route.use(protect);

route.post("/", profileController._createProfile);
route.patch("/me", profileController._updateProfile);
route.delete("/me", profileController._deleteProfile);

export default route;
