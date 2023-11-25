import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAvailableServiceUseCase } from "./findAvailableServiceUseCase";

export class FindAvailableServiceController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;
    const {service_id} = request.params;


    const createAssistanceStatusService = container.resolve(FindAvailableServiceUseCase);

    const result = await createAssistanceStatusService.handle(Number(service_id));

    return response.status(200).json(result);
  }
}