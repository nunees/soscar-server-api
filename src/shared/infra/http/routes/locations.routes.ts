import { CreateLocationController } from "@modules/locations/useCases/createLocation/CreateLocationController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const partnerLocationsRoutes = Router();

const createLocationController = new CreateLocationController();

partnerLocationsRoutes.post(
  "/",
  ensureAuthenticated,
  createLocationController.handle
);

export { partnerLocationsRoutes };
