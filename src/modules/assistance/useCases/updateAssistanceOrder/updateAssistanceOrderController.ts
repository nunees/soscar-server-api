import {Response, Request} from "express";
import { UpdateAssistanceOrderUseCase } from "./updateAssistanceOrderUseCase";
import { container } from "tsyringe";

export class UpdateAssistanceOrderController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;
    const {order_id} = request.params;
    const {order_status, total_price, total_miles} = request.body;

    const updateAssistanceOrderUseCase = container.resolve(UpdateAssistanceOrderUseCase);

    await updateAssistanceOrderUseCase.execute({
      order_id,
      order_status,
      total_price,
      total_miles
    }, id);

    return response.status(200).send();
  }
}