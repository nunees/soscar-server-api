import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindVehicleUsecase } from "./FindVehicleUseCase";

export class FindVehicleController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    const findVehicleUseCase = container.resolve(FindVehicleUsecase);

    const vehicle = await findVehicleUseCase.execute(id);

    return response.status(200).send(vehicle);
  }
}