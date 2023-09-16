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
import { UpdateLocationAvatarController } from "@modules/locations/useCases/updateLocationAvatar/updateLocationAvatarController";
import { FetchAvatarController } from "@modules/locations/useCases/fetchAvatar/fetchAvatarController";
import { FetchCoverController } from "@modules/locations/useCases/fetchCover/fetchCoverController";
import { UpdateLocationCoverImageController } from "@modules/locations/useCases/updateLocationCoverImage/UpdateLocationCoverImageController";


const partnerLocationsRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./upload/locations"));

const createLocationController = new CreateLocationController();
const deleteLocationController = new DeleteLocationController();
const findAllLocationsController = new FindAllLocationsController();
const findLocationController = new FindLocationController();
const updateLocationController = new UpdateLocationController();
const updateBusinessPhotoController = new UpdateBusinessPhotoController();
const fetchAllLocationsPhotosController = new FetchAllLocationsPhotosController();
const deletePhotoController = new DeletePhotoController();
const findLocationByServiceController = new FindLocationsByServiceController();
const updateLocationAvatarController = new UpdateLocationAvatarController();
const updateLocationCoverImageController = new UpdateLocationCoverImageController();
const fetchAvatarController = new FetchAvatarController();
const fetchCoverController = new FetchCoverController();


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


partnerLocationsRoutes.get(
  "/avatar/:location_id/:avatar_file",
  fetchAvatarController.handle
);

partnerLocationsRoutes.get(
  "/coverimage/:location_id/:cover_file",
  fetchCoverController.handle
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
  "/upload/new/:location_id",
  ensureAuthenticated,
  uploadAvatar.single("photo"),
  updateBusinessPhotoController.handle
);


// PUT
partnerLocationsRoutes.put('/avatar/:location_id', ensureAuthenticated, uploadAvatar.single('avatar'), updateLocationAvatarController.handle);

partnerLocationsRoutes.put('/cover/:location_id', ensureAuthenticated, uploadAvatar.single('cover'), updateLocationCoverImageController.handle);


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
