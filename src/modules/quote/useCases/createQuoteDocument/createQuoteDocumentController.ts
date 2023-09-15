import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateQuoteDocumentUseCase } from "./createQuoteDocumentUseCase";

export class CreateQuoteDocumentController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.user;
    const { quote_id } = request.params;
    const {hashId} = request.params;

    const document = request.file?.filename as string;

    const createQuoteDocumentUseCase = container.resolve(CreateQuoteDocumentUseCase);

    await createQuoteDocumentUseCase.execute({
      user_id: String(id),
      quote_id,
      document,
      hashId
    });

    return response.status(201).send();
  }
}