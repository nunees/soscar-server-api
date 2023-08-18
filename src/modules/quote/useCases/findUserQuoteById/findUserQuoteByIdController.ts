import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUserQuoteByIdUseCase } from "./findUserQuoteByIdUseCase";

export class FindUserQuoteByIdController{
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const { quote_id } = request.params;

    const findUserQuoteByIdUseCase = container.resolve(FindUserQuoteByIdUseCase);

    const quote = await findUserQuoteByIdUseCase.execute(String(id), quote_id);

    return response.status(200).json(quote);
  }
}