import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import multer from "multer";
import uploadConfig from "@config/uploadConfig";

import { CreateLocationController } from "@modules/locations/useCases/createLocation/createLocationController";
import { FindAllLocationsController } from "@modules/locations/useCases/findAllLocations/findAllLocationsController";
import { FindLocationController } from "@modules/locations/useCases/findLocation/findLocationController";
import { UpdateLocationController } from "@modules/locations/useCases/updateLocation/updateLocationController";
import { DeleteLocationController } from "@modules/locations/useCases/deleteLocation/deleteLocationController";


const partnerLocationsRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./public/locations"));

const createLocationController = new CreateLocationController();
const deleteLocationController = new DeleteLocationController();
const findAllLocationsController = new FindAllLocationsController();
const findLocationController = new FindLocationController();
const updateLocationController = new UpdateLocationController();


// GET
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


// POST
partnerLocationsRoutes.post(
  "/",
  ensureAuthenticated,
  createLocationController.handle
);


// PATCH
partnerLocationsRoutes.patch(
  "/:location_id",
  ensureAuthenticated,
  updateLocationController.handle
);


partnerLocationsRoutes.patch(
  "/:location_id/photos",
  ensureAuthenticated,
  uploadAvatar.array("photos"),
  updateLocationController.handle
);


// DELETE
partnerLocationsRoutes.delete(
  "/:location_id",
  ensureAuthenticated,
  deleteLocationController.handle
);

export { partnerLocationsRoutes };
