import { CreateAddressController } from "@modules/users/useCases/createAddress/CreateAddressController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";

import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FindAllAddressesController } from "@modules/users/useCases/findAllAddresses/FindAllAddressesController";
import { FindAddressController } from "@modules/users/useCases/findAddress/FindAddressController";
import { DeleteAddressController } from "@modules/users/useCases/deleteAddress/DeleteAddressController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const createAddressController = new CreateAddressController();
const findAllAddressesController = new FindAllAddressesController();
const findAddress = new FindAddressController();
const deleteAddress = new DeleteAddressController();

userRoutes.post("/new", createUserController.handle);
userRoutes.post(
  "/address/new",
  ensureAuthenticated,
  createAddressController.handle
);

userRoutes.get(
  "/address/all",
  ensureAuthenticated,
  findAllAddressesController.handle
);

userRoutes.get("/address/:id", ensureAuthenticated, findAddress.handle);

userRoutes.get(
  "/address/delete/:id",
  ensureAuthenticated,
  deleteAddress.handle
);

export { userRoutes };
