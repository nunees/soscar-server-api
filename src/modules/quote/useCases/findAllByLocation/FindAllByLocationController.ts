import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllByLocationUseCase } from "./FindAllByLocationUseCase";

export class FindAllByLocationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { location_id } = request.params;

    const findAllByLocationUseCase = container.resolve(FindAllByLocationUseCase);

    const quotes = await findAllByLocationUseCase.execute(location_id);

    return response.json(quotes);
  }
}