import {Request, Response} from "express";
import { container } from "tsyringe";
import { FindAssistanceOrderByIdUseCase } from "./findAssistanceOrderByIdUseCase";

export class FindAssistanceOrderByIdController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { order_id } = request.params;

    const findAssistanceOrderByIdUseCase = container.resolve(FindAssistanceOrderByIdUseCase);

    const order = await findAssistanceOrderByIdUseCase.execute(order_id);

    return response.status(200).json(order);
  }
}