import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateLocationUseCase } from "./createLocationUseCase";

export class CreateLocationController {
  async handle(request: Request, response: Response): Promise<Response> {
    try{
      const { id } = request.headers;

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
    } = request.body;

    const createLocationUseCase = container.resolve(CreateLocationUseCase);

    const location = await createLocationUseCase.execute(
      {
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
      },
      String(id)
    );

    return response.status(201).json(location);
  }
    catch(error){
      return response.status(400).json({error: error.message});
    }

  }
}