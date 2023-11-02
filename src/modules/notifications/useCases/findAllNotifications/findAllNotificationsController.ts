import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllNotificationsUseCase } from "./findAllNotificationsUseCase";

export class FindAllNotificationsController{
  async handle(request: Request, response: Response){
    const {id} = request.user;
    const {user_id} = request.params;

    console.log("id of user: ", user_id);

    const findAllNotificationsUseCase = container.resolve(FindAllNotificationsUseCase);

    const notifications = await findAllNotificationsUseCase.execute(user_id);

    return response.status(200).json(notifications);
  }
}