import { CreateLocationController } from "@modules/locations/useCases/createLocation/CreateLocationController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FindAllController } from "@modules/locations/useCases/findAll/FindAllController";

const partnerLocationsRoutes = Router();

const createLocationController = new CreateLocationController();
const findAllController = new FindAllController();

partnerLocationsRoutes.post(
  "/",
  ensureAuthenticated,
  createLocationController.handle
);

partnerLocationsRoutes.get(
  "/all",
  ensureAuthenticated,
  findAllController.handle
);

export { partnerLocationsRoutes };
