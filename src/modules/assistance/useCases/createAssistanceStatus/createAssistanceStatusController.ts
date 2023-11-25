import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAssistanceStatusUseCase } from "./createAssistanceStatusUseCase";

export class CreateAssistanceStatusController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;
    const {service_id} = request.params;
    const {milesFee} = request.body;
    const {price} = request.body;

    const createAssistanceStatusService = container.resolve(CreateAssistanceStatusUseCase);

    await createAssistanceStatusService.execute({
      service_id: Number(service_id),
      user_id: id,
      milesFee,
      price
    });

    return response.status(200).send();
  }
}