import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const {
      name,
      last_name,
      cpf,
      mobile_phone,
      birth_date,
      username,
      email,
      genderId,
      isPartner,
      avatar,
    } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute(String(id), {
      name,
      last_name,
      cpf,
      mobile_phone,
      birth_date: new Date(birth_date),
      username,
      email,
      genderId,
      isPartner,
      avatar,
    });

    return response.status(201).send();
  }
}
