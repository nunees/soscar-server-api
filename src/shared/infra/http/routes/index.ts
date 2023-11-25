import { Router } from "express";
import { authenticatedRoutes } from "./authentication.routes";
import { userRoutes } from "./users.routes";
import { partnerLocationsRoutes } from "./locations.routes";

import { vehiclesRoutes } from "./vehicles.routes";
import { quotesRoutes } from "./quotes.routes";
import { schedulesRoutes } from "./schedules.routes";
import { reviewsRoutes } from "./reviews.routes";
import { legalRoutes } from "./legal.routes";
import { notificationsRouter } from "./notifications.routes";
import { passwordRoutes } from "./passwords.routes";
import { assistanceRoutes } from "./assistance.routes";

const routes = Router();

routes.use(authenticatedRoutes);
routes.use("/user", userRoutes);
routes.use("/locations", partnerLocationsRoutes);
routes.use("/vehicles", vehiclesRoutes);
routes.use("/quotes", quotesRoutes);
routes.use("/legal", legalRoutes);
routes.use("/schedules", schedulesRoutes);
routes.use("/reviews", reviewsRoutes);
routes.use("/notifications", notificationsRouter);
routes.use("/passwords", passwordRoutes);
routes.use("/assistance", assistanceRoutes);


export { routes };
