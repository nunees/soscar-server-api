import {Request, Response} from "express";
import { container } from "tsyringe";
import { CreateReviewUseCase } from "./createReviewUseCase";
export class CreateReviewController{

  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;
    const {location_id, rating, review} = request.body;

    const createReviewUseCase = container.resolve(CreateReviewUseCase);

    await createReviewUseCase.execute({
      user_id: id,
      location_id,
      rating,
      review
    });

    return response.status(201).send();

  }
}