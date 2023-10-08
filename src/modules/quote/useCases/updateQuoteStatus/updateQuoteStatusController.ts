import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateQuoteStatusUseCase } from "./updateQuoteStatusUseCase";

export class UpdateQuoteStatusController{
  async handle(request: Request, response: Response):Promise<Response>{
    const { id } = request.user;
    const { quote_id } = request.params;
    const { status } = request.body;

    const updateQuoteStatusUseCase = container.resolve(UpdateQuoteStatusUseCase);

    const quote = await updateQuoteStatusUseCase.execute(id, quote_id, status);

    return response.status(200).json(quote);
  }

}