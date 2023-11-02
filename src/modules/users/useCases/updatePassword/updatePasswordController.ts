import {Request, Response} from "express";
import { container } from "tsyringe";
import { UpdatePasswordUseCase } from "./updatePasswordUseCase";

export class UpdatePasswordController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.user;
    const { password, old_password } = request.body;

    const updatePasswordUseCase = container.resolve(UpdatePasswordUseCase);

    await updatePasswordUseCase.execute(id, password, old_password);

    return response.status(200).send();
  }
}