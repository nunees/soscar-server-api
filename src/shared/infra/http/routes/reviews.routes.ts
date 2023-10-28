import { CreateReviewController } from "@modules/review/useCases/createReview/createReviewController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FindReviewByLocationController } from "@modules/review/useCases/findByLocation/findReviewByLocationController";

const reviewsRoutes = Router();


const createReviewController = new CreateReviewController();
const findReviewsByLocationController = new FindReviewByLocationController();

reviewsRoutes.get('/comments/:location_id', ensureAuthenticated, findReviewsByLocationController.handle);

reviewsRoutes.post("/", ensureAuthenticated, createReviewController.handle);

export { reviewsRoutes };
