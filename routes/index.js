import { Router } from "express";
import { get, post } from "../controllers/publicCtrl.js";
import {
  login,
  register,
  publicAccess,
  protectedAccess,
} from "../controllers/authCtrl.js";
import { tokenAuth } from "../middlewares/auth.js";

const apiRoutes = Router();

apiRoutes.get("/", get);
apiRoutes.post("/", post);
apiRoutes.post("/register", register);
apiRoutes.post("/login", login);
apiRoutes.get("/public", publicAccess);
apiRoutes.get("/protected", tokenAuth, protectedAccess);

export default apiRoutes;
