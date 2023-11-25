import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAssistanceOrderUseCase } from "./createAssistanceOrderUseCase";


export class CreateAssistanceOrderController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id: user_id} = request.user;
    const {assistance_status_id, order_status, total_price, total_miles, latitude, longitude } = request.body;

    const createAssistanceOrderUseCase = container.resolve(CreateAssistanceOrderUseCase);

    const assistanceOrder = await createAssistanceOrderUseCase.execute({
      user_id,
      assistance_status_id,
      order_status,
      total_price,
      total_miles,
      latitude,
      longitude
    }, );

    return response.status(201).json(assistanceOrder);
  }
}