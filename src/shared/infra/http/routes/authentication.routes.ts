import { AuthenticateUserController } from "@modules/users/useCases/authentication/AuthenticateUserController";
import { RefreshTokenController } from "@modules/users/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const authenticatedRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticatedRoutes.post("/sessions", authenticateUserController.handle);
authenticatedRoutes.post(
  "/refresh-token",
  ensureAuthenticated,
  refreshTokenController.handle
);

export { authenticatedRoutes };
