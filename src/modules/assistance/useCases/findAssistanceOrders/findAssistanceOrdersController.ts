import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAssistanceOrdersUseCase } from "./findAssistanceOrdersUseCase";

export class FindAssistanceOrdersController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id: user_id} = request.user;
    const {assistance_status_id} = request.params;


    const orders = container.resolve(FindAssistanceOrdersUseCase);

    const assistanceOrders = await orders.execute(user_id, assistance_status_id);

    return response.status(200).json(assistanceOrders);
  }
}