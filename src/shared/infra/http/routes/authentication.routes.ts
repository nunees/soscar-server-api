import { AuthenticateUserController } from "@modules/users/useCases/authentication/AuthenticateUserController";
import { RefreshTokenController } from "@modules/users/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

const authenticatedRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticatedRoutes.post("/session", authenticateUserController.handle);
authenticatedRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticatedRoutes };
