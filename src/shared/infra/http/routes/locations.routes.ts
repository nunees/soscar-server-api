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
import { FetchAllLocationsPhotosController } from "@modules/locations/useCases/fetchAllLoactionsPhotos/fetchAllLocationsPhotosController";
import { DeletePhotoController } from "@modules/locations/useCases/deletePhoto/deletePhotoController";
import { FindLocationsByServiceController } from "@modules/locations/useCases/findLocationsByService/findLocationsByServiceController";


const partnerLocationsRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./public/locations"));

const createLocationController = new CreateLocationController();
const deleteLocationController = new DeleteLocationController();
const findAllLocationsController = new FindAllLocationsController();
const findLocationController = new FindLocationController();
const updateLocationController = new UpdateLocationController();
const updateBusinessPhotoController = new UpdateBusinessPhotoController();
const fetchAllLocationsPhotosController = new FetchAllLocationsPhotosController();
const deletePhotoController = new DeletePhotoController();
const findLocationByServiceController = new FindLocationsByServiceController();


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

partnerLocationsRoutes.get(
  "/photo/:location_id/:photo_file",
  fetchAllLocationsPhotosController.handle
);

partnerLocationsRoutes.get(
  "/services/:serviceId",
  ensureAuthenticated,
  findLocationByServiceController.handle
);


// POST
partnerLocationsRoutes.post(
  "/",
  ensureAuthenticated,
  createLocationController.handle
);

partnerLocationsRoutes.patch(
  "/upload/new/:location_id",
  ensureAuthenticated,
  uploadAvatar.single("photo"),
  updateBusinessPhotoController.handle
);


// PATCH
partnerLocationsRoutes.patch(
  "/:location_id",
  ensureAuthenticated,
  updateLocationController.handle
);


// PUT



// DELETE
partnerLocationsRoutes.delete(
  "/:location_id",
  ensureAuthenticated,
  deleteLocationController.handle
);

partnerLocationsRoutes.delete(
  "/photo/:photo_id",
  ensureAuthenticated,
  deletePhotoController.handle
);



export { partnerLocationsRoutes };
