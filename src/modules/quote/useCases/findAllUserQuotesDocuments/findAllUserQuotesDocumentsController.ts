import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllUserQuotesDocumentsUseCase } from "./findAllUserQuotesDocumentsUseCase";

export class FindAllUserQuotesDocumentsController{
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const findAllUserQuotesDocumentsUseCase = container.resolve(FindAllUserQuotesDocumentsUseCase);

    const quotesDocuments = await findAllUserQuotesDocumentsUseCase.execute(String(id));

    return response.status(200).json(quotesDocuments);
  }
}