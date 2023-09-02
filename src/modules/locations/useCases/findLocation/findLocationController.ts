import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindLocationUseCase } from "./findLocationUseCase";

export class FindLocationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const { location_id } = request.params;

    const findLocationUseCase = container.resolve(FindLocationUseCase);

    const location = await findLocationUseCase.execute(
      id as string,
      location_id
    );

    return response.status(200).json(location);
  }
}
