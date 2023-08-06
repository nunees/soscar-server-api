import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateAddressController } from "@modules/users/useCases/createAddress/CreateAddressController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { FindAllAddressesController } from "@modules/users/useCases/findAllAddresses/FindAllAddressesController";
import { FindAddressController } from "@modules/users/useCases/findAddress/FindAddressController";
import { DeleteAddressController } from "@modules/users/useCases/deleteAddress/DeleteAddressController";
import { UpdateAvatarController } from "@modules/users/useCases/updateAvatar/UpdateAvatarController";
import { FetchAvatarController } from "@modules/users/useCases/fetchAvatar/FetchAvatarController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";

import multer from "multer";
import uploadConfig from "@config/uploadConfig";

const userRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./public/avatar"));

const createUserController = new CreateUserController();
const createAddressController = new CreateAddressController();
const findAllAddressesController = new FindAllAddressesController();
const findAddress = new FindAddressController();
const deleteAddress = new DeleteAddressController();
const updateAvatarController = new UpdateAvatarController();
const fetchAvatarController = new FetchAvatarController();
const deleteUserController = new DeleteUserController();

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

userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);

userRoutes.get("/avatar", ensureAuthenticated, fetchAvatarController.handle);

userRoutes.get("/delete", ensureAuthenticated, deleteUserController.handle);

export { userRoutes };
