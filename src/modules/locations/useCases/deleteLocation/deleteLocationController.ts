import {Request, Response} from "express";
import { container } from "tsyringe";
import { DeleteLocationUseCase } from "./deleteLocationUseCase";

export class DeleteLocationController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.headers;
    const { location_id } = request.params;

    const deleteLocationUseCase = container.resolve(DeleteLocationUseCase);

    await deleteLocationUseCase.execute(String(id), location_id);

    return response.status(200).send();
  }
}