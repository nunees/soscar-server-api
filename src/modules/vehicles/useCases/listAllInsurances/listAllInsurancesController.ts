import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllInsurancesUseCase } from "./listAllInsurancesUseCase";


export class ListAllInsurancesController{
  async handle(request: Request, response: Response): Promise<Response> {

    const listAllInsurancesUseCase = container.resolve(ListAllInsurancesUseCase);

    const insurances = await listAllInsurancesUseCase.execute();

    return response.status(200).json(insurances);

  }
}