import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllAddressesUseCase } from "./FindAllAddressesUseCase";

export class FindAllAddressesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findAllAddressesUseCase = container.resolve(FindAllAddressesUseCase);

    const userAddresses = await findAllAddressesUseCase.execute(id);

    return response.json(userAddresses);
  }
}
