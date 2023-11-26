import { Request, Response } from "express";
import { container } from "tsyringe";
import { MarkNotificationAsReadUseCase } from "./markNotificationAsReadUseCase";

export class MarkNotificationAsReadController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { notification_id } = request.params;

    const markNotificationAsReadUseCase = container.resolve(MarkNotificationAsReadUseCase);

    await markNotificationAsReadUseCase.execute(notification_id);

    return response.status(200).send();
  }
}