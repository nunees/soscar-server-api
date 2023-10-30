import{ Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLegalQuoteUseCase } from "./UpdateLegalQuoteUseCase";

export class UpdateLegalQuoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { quote_id } = request.params;
    const { franchise_price, service_price, service_description, partner_notes, status } = request.body;

    const updateLegalQuote = container.resolve(UpdateLegalQuoteUseCase);

    await updateLegalQuote.execute({user_id: id, quote_id, franchise_price, service_price, service_description, partner_notes, status});

    return response.status(200).send();

  }

}