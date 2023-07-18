import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateLocationUseCase } from "./CreateLocationUseCase";

export class CreateLocationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const createLocationUseCase = container.resolve(CreateLocationUseCase);

    await createLocationUseCase.execute(request.body, id);

    return response.status(201).send();
  }
}
