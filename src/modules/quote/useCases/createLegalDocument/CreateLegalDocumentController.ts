import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateLegalDocumentUseCase } from './CreateLegalDocumentUseCase';
export class CreateLegalDocumentController {
  async handle(request: Request, response: Response): Promise<Response> {


    const { id } = request.user;
    const { hashId } = request.params;

    const document = request.file?.filename as string;

    const createLegalDocumentUseCase = container.resolve(
      CreateLegalDocumentUseCase
    );

    const file = await createLegalDocumentUseCase.execute({
      user_id: id,
      hashId,
      document_url: document,
    });



    return response.status(201).send(file);
  }
}
