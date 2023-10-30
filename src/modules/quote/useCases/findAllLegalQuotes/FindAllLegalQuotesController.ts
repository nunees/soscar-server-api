import { Request, Response } from "express";
import { container } from "tsyringe";
import { FIndAllLegalQuotesUseCase } from "./FindAllLegalQuotesUseCase";

export class FindAllLegalQuotesController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;

    const findAllLegalQuotesUseCase = container.resolve(FIndAllLegalQuotesUseCase);

    const quotes = await findAllLegalQuotesUseCase.execute(id);

    console.log("Quotes: ", quotes)

    return response.json(quotes);
  }
}