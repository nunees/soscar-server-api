import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllUserLegalQuotesUseCase } from "./FindAllUserLegalQuotesUseCase";

export class FindAllUseLegalQuotesController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.user;

    const findAllUserLegalQuotesUseCase = container.resolve(FindAllUserLegalQuotesUseCase);

    const quotes = await findAllUserLegalQuotesUseCase.execute(id);

    return response.json(quotes);
  }
}