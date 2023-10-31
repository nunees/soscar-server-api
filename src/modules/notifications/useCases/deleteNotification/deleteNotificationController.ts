import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteNotificationUseCase } from "./deleteNotificationUseCase";

export class DeleteNotificationController{
  async handle(request: Request, response: Response){
    const { notification_id } = request.params;

    const deleteNotificationUseCase = container.resolve(DeleteNotificationUseCase);

    await deleteNotificationUseCase.execute(
      notification_id,
    );

    return response.status(201).send();
  }

}