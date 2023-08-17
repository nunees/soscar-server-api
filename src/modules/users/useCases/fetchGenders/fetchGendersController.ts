import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchGendersUseCase } from "./fetchGendersUseCase";

export class FetchGendersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const fetchGendersUseCase = container.resolve(FetchGendersUseCase);

    const genders = await fetchGendersUseCase.execute();

    return response.status(200).json(genders);
  }
}
