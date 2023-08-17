import { CreateVechicleController } from "@modules/vehicles/useCases/createVehicle/CreateVehicleController";
import { FetchAllController } from "@modules/vehicles/useCases/fetchAll/FetchAllController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DeleteVehicleController } from "@modules/vehicles/useCases/deleteVehicle/DeleteVehicleController";
import { UpdateVehicleController } from "@modules/vehicles/useCases/updateVehicle/UpdateVehiclesController";
import { ListAllBrandsController } from "@modules/vehicles/useCases/listAllBrands/ListAllBrandsController";
import { ListAllVehiclesNamesController } from "@modules/vehicles/useCases/listAllVehiclesNames/ListAllVehiclesNamesController";

const vehiclesRoutes = Router();

const createVechicleController = new CreateVechicleController();
const fetchAllController = new FetchAllController();
const deleteVehicleController = new DeleteVehicleController();
const updateVehicleController = new UpdateVehicleController();
const listALlBrandsController = new ListAllBrandsController();
const listAllVehiclesNamesController = new ListAllVehiclesNamesController();

vehiclesRoutes.post("/", ensureAuthenticated, createVechicleController.handle);
vehiclesRoutes.get("/", ensureAuthenticated, fetchAllController.handle);
vehiclesRoutes.delete(
  "/:vehicle_id",
  ensureAuthenticated,
  deleteVehicleController.handle
);
vehiclesRoutes.patch(
  "/:vehicle_id",
  ensureAuthenticated,
  updateVehicleController.handle
);
vehiclesRoutes.get(
  "/brands",
  ensureAuthenticated,
  listALlBrandsController.handle
);
vehiclesRoutes.get(
  "/names",
  ensureAuthenticated,
  listAllVehiclesNamesController.handle
);

export { vehiclesRoutes };
