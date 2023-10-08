import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllUserQuotesUseCase } from "./findAllUserQuotesUseCase";

export class FindAllUserQuotesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const {user_type} = request.params;

    const findAllUserQuotesUseCase = container.resolve(FindAllUserQuotesUseCase);

    const quotes = await findAllUserQuotesUseCase.execute(String(id), user_type);

    return response.status(200).json(quotes);
  }
}