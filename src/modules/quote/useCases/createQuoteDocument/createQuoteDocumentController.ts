import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateQuoteDocumentUseCase } from "./createQuoteDocumentUseCase";

export class CreateQuoteDocumentController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.headers;
    const { quote_id } = request.params;

    const documents = request.files;

    const createQuoteDocumentUseCase = container.resolve(CreateQuoteDocumentUseCase);

    const quoteDocument = await createQuoteDocumentUseCase.execute({
      user_id: String(id),
      quote_id,
      documents
    });

    return response.status(201).json(quoteDocument);
  }
}