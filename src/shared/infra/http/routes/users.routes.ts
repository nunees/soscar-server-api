import { Router } from "express";

import { CreateAddressController } from "@modules/users/useCases/createAddress/CreateAddressController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { FindAllAddressesController } from "@modules/users/useCases/findAllAddresses/FindAllAddressesController";
import { FindAddressController } from "@modules/users/useCases/findAddress/FindAddressController";
import { DeleteAddressController } from "@modules/users/useCases/deleteAddress/DeleteAddressController";
import { UpdateAvatarController } from "@modules/users/useCases/updateAvatar/UpdateAvatarController";
import { FetchAvatarController } from "@modules/users/useCases/fetchAvatar/FetchAvatarController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { UpdateAddressController } from "@modules/users/useCases/updateAddress/UpdateAddressController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { FetchUserProfileController } from "@modules/users/useCases/fetchUserProfile/fetchUserProfileController";
import { UpdatePasswordController } from "@modules/users/useCases/updatePassword/updatePasswordController";
import { FetchGendersController } from "@modules/users/useCases/fetchGenders/fetchGendersController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from "@config/uploadConfig";

const userRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./public/avatar"));

const createUserController = new CreateUserController();
const createAddressController = new CreateAddressController();
const findAllAddressesController = new FindAllAddressesController();
const findAddressController = new FindAddressController();
const deleteAddressController = new DeleteAddressController();
const updateAvatarController = new UpdateAvatarController();
const fetchAvatarController = new FetchAvatarController();
const deleteUserController = new DeleteUserController();
const updateAddressController = new UpdateAddressController();
const updateUserController = new UpdateUserController();
const fetchUserProfileController = new FetchUserProfileController();
const updatePasswordController = new UpdatePasswordController();
const fetchGendersController = new FetchGendersController();


userRoutes.get("/genders", fetchGendersController.handle);
userRoutes.post("/new", createUserController.handle);
userRoutes.post(
  "/address/new",
  ensureAuthenticated,
  createAddressController.handle
);
userRoutes.post("/address/new", ensureAuthenticated, createAddressController.handle);

userRoutes.get('/profile', ensureAuthenticated, fetchUserProfileController.handle);



userRoutes.get(
  "/address/all",
  ensureAuthenticated,
  findAllAddressesController.handle
);

userRoutes.get(
  "/address/:id",
  ensureAuthenticated,
  findAddressController.handle
);

userRoutes.patch(
  "/address/:address_id",
  ensureAuthenticated,
  updateAddressController.handle
);

userRoutes.delete(
  "/address/:id",
  ensureAuthenticated,
  deleteAddressController.handle
);

userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);

userRoutes.patch("/", ensureAuthenticated, updateUserController.handle);

userRoutes.put("/password/update", ensureAuthenticated, updatePasswordController.handle);

userRoutes.get("/avatar/:user_id/:avatar_file", fetchAvatarController.handle);

userRoutes.get("/delete", ensureAuthenticated, deleteUserController.handle);



export { userRoutes };
