import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindNotificationByUserIdUseCase } from "./findNotificationByUserIdUseCase";

export class FindNotificationByUserIdController{
  async handle(request: Request, response: Response){
    const { user_id } = request.params;

    console.log("id of user: ", user_id);

    const findNotificationByUserIdUseCase = container.resolve(FindNotificationByUserIdUseCase);

    const notifications = await findNotificationByUserIdUseCase.execute(
      user_id,
    );

    return response.json(notifications);
  }
}