import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteVehicleUseCase } from "./DeleteVehicleUseCase";

export class DeleteVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const { vehicle_id } = request.params;

    const deleteVehicleUseCase = container.resolve(DeleteVehicleUseCase);

    await deleteVehicleUseCase.execute(String(id), vehicle_id);

    return response.status(200).send();
  }
}
