import { CreateLocationController } from "@modules/locations/useCases/createLocation/CreateLocationController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { FindAllLocationsController } from "@modules/locations/useCases/findAllLocations/findAllLocationsController";
import { FindLocationController } from "@modules/locations/useCases/findLocation/findLocationController";
import { UpdateLocationController } from "@modules/locations/useCases/updateLocation/updateLocationController";
import { DeleteLocationController } from "@modules/locations/useCases/deleteLocation/deleteLocationController";

const partnerLocationsRoutes = Router();

const createLocationController = new CreateLocationController();
const deleteLocationController = new DeleteLocationController();
const findAllLocationsController = new FindAllLocationsController();
const findLocationController = new FindLocationController();
const updateLocationController = new UpdateLocationController();

partnerLocationsRoutes.post(
  "/",
  ensureAuthenticated,
  createLocationController.handle
);

partnerLocationsRoutes.delete(
  "/:location_id",
  ensureAuthenticated,
  deleteLocationController.handle
);

partnerLocationsRoutes.put(
  "/:location_id",
  ensureAuthenticated,
  updateLocationController.handle
);

partnerLocationsRoutes.get(
  "/:location_id",
  ensureAuthenticated,
  findLocationController.handle
);

partnerLocationsRoutes.get(
  "/",
  ensureAuthenticated,
  findAllLocationsController.handle
);

export { partnerLocationsRoutes };
