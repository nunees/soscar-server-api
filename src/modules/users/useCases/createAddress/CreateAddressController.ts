import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAddressUseCase } from "./CreateAddressUseCase";

export class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    if (!request.user || !request.body) {
      throw new AppError("Nao foi possivel criar um novo endereco");
    }

    const { id } = request.user;
    const { address_line, number, city, district, state, zipcode } =
      request.body;

    const createAddressUseCase = container.resolve(CreateAddressUseCase);

    await createAddressUseCase.execute({
      user_id: id,
      address_line,
      number,
      district,
      city,
      state,
      zipcode,
    });

    return response
      .status(201)
      .json({ statusCode: 201, message: "Endereco criado com sucesso!" });
  }
}
