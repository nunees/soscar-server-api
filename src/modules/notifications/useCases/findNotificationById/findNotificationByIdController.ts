import { Request, Response } from "express";
import { FindNotificationByIdUseCase } from "./findNotificationByIdUseCase";
import { container } from "tsyringe";


export class FindNotificationByIdController{
  async handle(request: Request, response: Response){
    const { notification_id } = request.params;

    const findNotificationByIdUseCase = container.resolve(FindNotificationByIdUseCase);

    const notification = await findNotificationByIdUseCase.execute(notification_id);

    return response.status(201).send(notification);
  }
}