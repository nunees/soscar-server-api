import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateLegalQuoteStatusUseCase } from './UpdateLegalQuoteStatusUseCase';

export class UpdateLegalQuoteStatusController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;
    const {quote_id} = request.params;
    const {status} = request.body;

    const updateLegalQuoteStatusUseCase = container.resolve(UpdateLegalQuoteStatusUseCase);

    await updateLegalQuoteStatusUseCase.execute(id, quote_id, status);

    return response.status(200).send();
  }
}
