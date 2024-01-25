import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "@modules/users/useCases/updateAvatar/UpdateAvatarController";
import { FetchAvatarController } from "@modules/users/useCases/fetchAvatar/FetchAvatarController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { FetchUserProfileController } from "@modules/users/useCases/fetchUserProfile/fetchUserProfileController";
import { UpdatePasswordController } from "@modules/users/useCases/updatePassword/updatePasswordController";
import { FetchGendersController } from "@modules/users/useCases/fetchGenders/fetchGendersController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from "@config/uploadConfig";

const userRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./upload/avatar"));

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();
const fetchAvatarController = new FetchAvatarController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const fetchUserProfileController = new FetchUserProfileController();
const updatePasswordController = new UpdatePasswordController();
const fetchGendersController = new FetchGendersController();


userRoutes.get("/genders", fetchGendersController.handle);
userRoutes.post("/new", createUserController.handle);

userRoutes.get('/profile/:user_id', ensureAuthenticated, fetchUserProfileController.handle);


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
