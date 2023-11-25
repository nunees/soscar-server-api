import { Request, Response } from "express";
import { container } from "tsyringe";
import { AcceptOrderUseCase } from "./acceptOrderUseCase";

export class AcceptOrderController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {order_id} = request.params;

    const acceptOrderUseCase = container.resolve(AcceptOrderUseCase);

    await acceptOrderUseCase.execute(order_id);

    return response.status(200).send();
  }
}