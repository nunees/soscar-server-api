import { Router } from "express";
import { authenticatedRoutes } from "./authentication.routes";
import { userRoutes } from "./users.routes";
import { partnerLocationsRoutes } from "./locations.routes";
import { additionalDataRoutes } from "./additionalData.routes";
import { vehiclesRoutes } from "./vehicles.routes";

const routes = Router();

routes.use(authenticatedRoutes);
routes.use("/user", userRoutes);
routes.use("/locations", partnerLocationsRoutes);
routes.use("/vehicles", vehiclesRoutes);

// Additional data routes
routes.use("/data", additionalDataRoutes);

export { routes };
