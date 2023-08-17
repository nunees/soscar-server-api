import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllUseCase } from "./FindAllUseCase";

export class FindAllController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findAllUseCase = container.resolve(FindAllUseCase);

    const locations = await findAllUseCase.execute(id);

    return response.status(200).json(locations);
  }
}
