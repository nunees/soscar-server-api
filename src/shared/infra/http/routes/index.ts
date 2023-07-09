import { Router } from "express";
import { authenticatedRoutes } from "./authentication.routes";
import { userRoutes } from "./users.routes";

const routes = Router();

routes.use(authenticatedRoutes);
routes.use("/user", userRoutes);

export { routes };
