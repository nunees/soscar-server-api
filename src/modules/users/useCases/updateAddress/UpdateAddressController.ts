import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAddressUseCase } from "./UpdateAddressUseCase";

export class UpdateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    const { address_id } = request.params;

    const { address_line, number, district, city, state, zipcode } =
      request.body;

    const updateAddressUseCase = container.resolve(UpdateAddressUseCase);

    await updateAddressUseCase.execute({
      user_id: String(id),
      address_id,
      address_line,
      number,
      district,
      city,
      state,
      zipcode,
    });

    return response.status(200).send();
  }
}
