import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllPartnerLegalQuotesUseCase } from "./FindAllPartnerLegalQuotesUseCase";

export class FindAllPartnerLegalQuotesController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { user_id } = request.params;

    const findAllPartnerLegalQuotesUseCase = container.resolve(FindAllPartnerLegalQuotesUseCase);

    const quotes = await findAllPartnerLegalQuotesUseCase.execute(user_id);

    return response.status(200).send(quotes);
  }
}