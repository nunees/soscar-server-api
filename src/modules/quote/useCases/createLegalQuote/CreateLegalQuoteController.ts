import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateLegalQuoteUseCase } from './CreateLegalQuoteUseCase';

export class CreateLegalQuoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      hashId,
      vehicle_id,
      insurance_company_id,
      service_type_id,
      user_notes,
      locations,
    } = request.body;

    const createLegalQuoteUseCase = container.resolve(CreateLegalQuoteUseCase);

    const quote = await createLegalQuoteUseCase.execute({
      user_id,
      hashId,
      vehicle_id,
      insurance_company_id,
      service_type_id,
      user_notes,
      locations,
    });

    return response.status(201).json(quote);
  }
}
