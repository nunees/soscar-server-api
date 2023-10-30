import {Request, Response} from "express";
import { container } from "tsyringe";
import { FindLegalQuoteDocumentsUseCase } from "./findLegalQuoteDocumentsUseCase";

export class FindLegalQuoteDocumentsController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;
    const {hashId} = request.params;

    const findLegalQuoteDocumentsUseCase = container.resolve(FindLegalQuoteDocumentsUseCase);

    const documents = await findLegalQuoteDocumentsUseCase.execute(hashId);

    return response.json(documents);
  }
}