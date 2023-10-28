import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindReviewByLocationUseCase } from "./findReviewByLocationUseCase";

export class FindReviewByLocationController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {location_id} = request.params;

    const findReviewByLocationUseCase = container.resolve(FindReviewByLocationUseCase);

    const reviews = await findReviewByLocationUseCase.execute(location_id);

    console.log(reviews)

    return response.json(reviews);
  }
}