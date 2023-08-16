import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteLocationUseCase } from "./deleteLocationUseCase";

export class DeleteLocationController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { location_id } = request.params;

    const deleteLocationUseCase = container.resolve(DeleteLocationUseCase);

    await deleteLocationUseCase.execute(id, location_id);

    return response.status(200).send();
  }
}
