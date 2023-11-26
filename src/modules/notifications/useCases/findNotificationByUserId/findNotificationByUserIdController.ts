import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindNotificationByUserIdUseCase } from "./findNotificationByUserIdUseCase";

export class FindNotificationByUserIdController{
  async handle(request: Request, response: Response){


    const {id} = request.user;


    const findNotificationByUserIdUseCase = container.resolve(FindNotificationByUserIdUseCase);

    const notifications = await findNotificationByUserIdUseCase.execute(
      id,
    );

    return response.status(200).json(notifications);
  }
}