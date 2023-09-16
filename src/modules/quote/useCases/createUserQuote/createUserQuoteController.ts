import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserQuoteUseCase } from "./createUserQuoteUseCase";

export class CreateUserQuoteController{
  async handle(request: Request, response: Response): Promise<Response>{

    const {id} = request.headers;
    const {
      hashId,
      is_juridical,
      vehicle_id,
      insurance_type_id,
      insurance_company_id,
      service_type_id,
      user_notes,
      location_id
    } = request.body;


    const createUserQuoteUseCase = container.resolve(CreateUserQuoteUseCase);

    const quote = await createUserQuoteUseCase.execute({
      user_id: String(id),
      is_juridical,
      vehicle_id,
      insurance_type_id,
      insurance_company_id,
      hashId,
      service_type_id,
      user_notes,
      location_id
    });

    return response.status(201).json(quote);
  }
}