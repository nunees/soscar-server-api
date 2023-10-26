import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateLegalDocumentUseCase } from './CreateLegalDocumentUseCase';
export class CreateLegalDocumentController {
  async handle(request: Request, response: Response): Promise<Response> {


    const { id } = request.user;
    const { quote_id } = request.params;

    const document = request.file?.filename as string;

    const createLegalDocumentUseCase = container.resolve(
      CreateLegalDocumentUseCase
    );

    await createLegalDocumentUseCase.execute({
      user_id: id,
      quote_id,
      document_url: document,
    });

    return response.status(201).send();
  }
}
