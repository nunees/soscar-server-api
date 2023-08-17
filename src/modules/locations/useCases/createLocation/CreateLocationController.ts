import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateLocationUseCase } from "./CreateLocationUseCase";

export class CreateLocationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

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

    const createLocationUseCase = container.resolve(CreateLocationUseCase);

    await createLocationUseCase.execute(
      {
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
      },
      id
    );

    return response.status(201).send();
  }
}
