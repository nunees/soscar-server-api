import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindNotificationByUserIdUseCase } from "./findNotificationByUserIdUseCase";

export class FindNotificationByUserIdController{
  async handle(request: Request, response: Response){
    console.log("FindNotificationByUserIdController")

    const {id} = request.user;
    //const { user_id } = request.params;

    const findNotificationByUserIdUseCase = container.resolve(FindNotificationByUserIdUseCase);

    const notifications = await findNotificationByUserIdUseCase.execute(
      id,
    );

    return response.status(200).json(notifications);
  }
}