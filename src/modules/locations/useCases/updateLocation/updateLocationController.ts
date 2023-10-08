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
      address_line,
      number,
      city,
      district,
      state,
      zipcode,
      payment_methods,
      business_categories,
      business_description,
      open_hours,
      open_hours_weekend,
      latitude,
      longitude
    } = request.body;

    const updateLocationUseCase = container.resolve(UpdateLocationUseCase);

    await updateLocationUseCase.execute({
      user_id: String(id),
      location_id,
      cnpj,
      business_name,
      business_phone,
      business_email,
      address_line,
      number,
      city,
      district,
      state,
      zipcode,
      payment_methods,
      business_categories,
      business_description,
      open_hours,
      open_hours_weekend,
      latitude,
      longitude,
    });

    return response.status(200).send();
  }
}
