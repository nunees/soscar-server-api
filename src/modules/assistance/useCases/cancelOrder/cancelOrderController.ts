import {Request, Response} from 'express';

import {container} from 'tsyringe';
import { CancelOrderUseCase } from './cancelOrderUseCase';

export class CancelOrderController{
  async handle(request: Request, response: Response): Promise<Response>{

    const {order_id} = request.params;

    const cancelOrderUseCase = container.resolve(CancelOrderUseCase);

    await cancelOrderUseCase.execute(order_id);

    return response.status(200).send();
  }
}