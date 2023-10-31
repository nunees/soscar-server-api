import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAllNotificationsUseCase } from "./deleteAllNotificationsUseCase";

export class DeleteAllNotificationsController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.user;
    const {user_id} = request.params;

    const deleteAllNotificationsUseCase = container.resolve(DeleteAllNotificationsUseCase);

    await deleteAllNotificationsUseCase.execute(user_id);

    return response.status(200).send();
  }
}