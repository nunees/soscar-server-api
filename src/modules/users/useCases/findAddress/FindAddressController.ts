import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAddressUseCase } from "./FindAddressUseCase";

export class FindAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findAddressUseCase = container.resolve(FindAddressUseCase);

    const userAddresses = await findAddressUseCase.execute(id);

    return response.json(userAddresses);
  }
}
