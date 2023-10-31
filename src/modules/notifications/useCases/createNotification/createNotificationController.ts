import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateNotificationUseCase } from "./createNotificationUseCase";

export class CreateNotificationController{
  async handle(request: Request, response: Response){
    const { user_id, title, body, channel } = request.body;

    const createNotificationUseCase = container.resolve(CreateNotificationUseCase);

    await createNotificationUseCase.execute({
      user_id,
      title,
      body,
      channel,
    });

    return response.status(201).send();

  }
}