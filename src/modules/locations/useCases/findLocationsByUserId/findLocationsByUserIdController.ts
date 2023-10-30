import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindLocationsByUserIdUseCase } from "./FindLocationsByUserIdUseCase";

export class FindLocationsByUserIdController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;

    const findLocationsByUserIdUseCase = container.resolve(FindLocationsByUserIdUseCase);

    const locations = await findLocationsByUserIdUseCase.execute(id);

    return response.json(locations);

  }
}