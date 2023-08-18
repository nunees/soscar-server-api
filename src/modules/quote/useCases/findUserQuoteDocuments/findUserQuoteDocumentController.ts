import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindUserQuoteDocumentUseCase } from './findUserQuoteDocumentUseCase';

export class FindUserQuoteDocumentController{
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const { quote_id } = request.params;

    const findUserQuoteDocumentUseCase = container.resolve(FindUserQuoteDocumentUseCase);

    const quote = await findUserQuoteDocumentUseCase.execute(String(id), quote_id);

    return response.status(200).json(quote);
  }
}