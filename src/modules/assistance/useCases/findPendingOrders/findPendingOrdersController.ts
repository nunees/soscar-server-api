import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPendingOrdersUseCase } from "./findPendingOrdersUseCase";

export class FindPendingOrdersController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id: user_id} = request.user;

    const findPendingOrdersUseCase = container.resolve(FindPendingOrdersUseCase);

    const isTherePendingOrders = await findPendingOrdersUseCase.execute(user_id);

    return response.status(200).json({havePendingOrders: isTherePendingOrders});
  }
}