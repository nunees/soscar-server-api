import { FetchGendersController } from "@modules/users/useCases/fetchGenders/fetchGendersController";
import { Router } from "express";

const additionalDataRoutes = Router();

const fetchGendersController = new FetchGendersController();

additionalDataRoutes.get("/genders", fetchGendersController.handle);

export { additionalDataRoutes };
