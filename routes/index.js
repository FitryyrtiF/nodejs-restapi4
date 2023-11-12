import { Router } from "express";
import { get, post } from "../controllers/publicCtrl.js";
import { login, register } from "../controllers/authCtrl.js";

const apiRoutes = Router();

apiRoutes.get("/", get);
apiRoutes.post("/", post);
apiRoutes.post("/register", register);
apiRoutes.post("/login", login);

export default apiRoutes;
