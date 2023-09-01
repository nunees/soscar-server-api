import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


import { CreateLocationController } from "@modules/locations/useCases/createLocation/createLocationController";
import { FindAllLocationsController } from "@modules/locations/useCases/findAllLocations/findAllLocationsController";
import { FindLocationController } from "@modules/locations/useCases/findLocation/findLocationController";
import { UpdateLocationController } from "@modules/locations/useCases/updateLocation/updateLocationController";
import { DeleteLocationController } from "@modules/locations/useCases/deleteLocation/deleteLocationController";

import multer from "multer";
import uploadConfig from "@config/uploadConfig";
import { UpdateBusinessPhotoController } from "@modules/locations/useCases/updateBusinessPhotos/updateBusinessPhotoController";

const partnerLocationsRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./public/locations"));

const createLocationController = new CreateLocationController();
const deleteLocationController = new DeleteLocationController();
const findAllLocationsController = new FindAllLocationsController();
const findLocationController = new FindLocationController();
const updateLocationController = new UpdateLocationController();
const updateBusinessPhotoController = new UpdateBusinessPhotoController();


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


// PUT
partnerLocationsRoutes.patch(
  "/:location_id/upload",
  ensureAuthenticated,
  uploadAvatar.array("photo", 5),
  updateBusinessPhotoController.handle
);


// DELETE
partnerLocationsRoutes.delete(
  "/:location_id",
  ensureAuthenticated,
  deleteLocationController.handle
);

export { partnerLocationsRoutes };
