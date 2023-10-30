import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindLegalQuoteByIdUse } from "./FindLegalQuoteByIdUseCase";

export class FindLegalQuoteByIdController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;
    const { quote_id } = request.params;

    const findLegalQuoteByIdUseCase = container.resolve(FindLegalQuoteByIdUse);

    const quote = await findLegalQuoteByIdUseCase.execute(id, quote_id);

    return response.status(200).json(quote);
  }
}