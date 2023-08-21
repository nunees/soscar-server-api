import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllVehiclesNamesUseCase } from "./listAllVehiclesNamesUseCase";

export class ListAllVehiclesNamesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllVehiclesNamesUseCase = container.resolve(
      ListAllVehiclesNamesUseCase
    );

    const allVehiclesNames = await listAllVehiclesNamesUseCase.execute();

    return response.status(200).json(allVehiclesNames);
  }
}