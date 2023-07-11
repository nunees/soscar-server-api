import { CreateAddressController } from "@modules/users/useCases/createAddress/CreateAddressController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";

import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const createAddressController = new CreateAddressController();

userRoutes.post("/new", createUserController.handle);
userRoutes.post(
  "/address/new",
  ensureAuthenticated,
  createAddressController.handle
);

export { userRoutes };
