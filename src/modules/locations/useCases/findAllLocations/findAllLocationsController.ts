import { Request, Response } from "express";
import { FindAllLocationsUseCase } from "./findAllLocationsUseCase";
import { container } from "tsyringe";

export class FindAllLocationsController {
  async handle(request: Request, response: Response):Promise<Response> {
    const { id } = request.headers;

    const findAllLocationsUseCase = container.resolve(FindAllLocationsUseCase);

    const locations = await findAllLocationsUseCase.execute(String(id));

    return response.status(200).json({locations});
  }
}
