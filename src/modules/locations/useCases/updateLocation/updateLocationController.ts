import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLocationUseCase } from "./updateLocationUseCase";

export class UpdateLocationController {
  async handle(request: Request, response: Response) {
    const { id } = request.headers;
    const { location_id } = request.params;

    const {
      cnpj,
      business_name,
      business_phone,
      business_email,
      business_expertise,
      address_line,
      number,
      city,
      district,
      state,
      zipcode,
    } = request.body;

    const updateLocationUseCase = container.resolve(UpdateLocationUseCase);

    await updateLocationUseCase.execute({
      user_id: String(id),
      location_id,
      cnpj,
      business_name,
      business_phone,
      business_email,
      business_expertise,
      address_line,
      number,
      city,
      district,
      state,
      zipcode,
    });

    return response.status(200).send();
  }
}
