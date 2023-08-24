import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchAllUseCase } from "./FetchAllUseCase";

export class FetchAllController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    const fetchAllUseCase = container.resolve(FetchAllUseCase);

    const vechicles = await fetchAllUseCase.execute(String(id));

    return response.status(200).json(vechicles);
  }
}
