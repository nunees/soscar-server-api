import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateVehicleUseCase } from "./UpdateVehicleUseCase";

export class UpdateVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const { vehicle_id } = request.params;
    const { brand_id, name_id, color, year, plate, engineMiles } = request.body;

    const createVehicleUseCase = container.resolve(UpdateVehicleUseCase);

    await createVehicleUseCase.execute(vehicle_id, {
      user_id: String(id),
      brand_id,
      name_id,
      color,
      year,
      plate,
      engineMiles,
    });

    return response.status(201).send();
  }
}
