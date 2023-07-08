import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./createUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      last_name,
      cpf,
      mobile_phone,
      birth_date,
      username,
      email,
      password,
      isPartner,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const result = await createUserUseCase.execute({
      name,
      last_name,
      cpf,
      mobile_phone,
      birth_date,
      username,
      email,
      password,
      isPartner,
    });

    return response.status(201).json(result);
  }
}
