import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindNotReadNotificationUseCase } from "./findNotReadNotificationUseCase";

export class FindNotReadNotificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findNotReadNotificationUseCase = container.resolve(FindNotReadNotificationUseCase);

    const notifications = await findNotReadNotificationUseCase.execute(id);

    return response.status(200).json(notifications);
  }
}