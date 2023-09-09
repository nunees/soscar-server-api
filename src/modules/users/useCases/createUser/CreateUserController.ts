import { container } from "tsyringe";
import { Request, Response } from "express";
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
      genderId,
      email,
      password,
      isPartner,
      isTermsAccepted,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    console.log(request.body);

    const user = await createUserUseCase.execute({
      name,
      last_name,
      cpf,
      mobile_phone,
      birth_date,
      genderId,
      username,
      email,
      password,
      isPartner,
      isTermsAccepted,
    });

    return response.status(201).send(user);
  }
}
