import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateRegularQuoteUseCase } from "./updateRegularQuoteUseCase";

export class UpdateRegularQuoteController{
  async handle(request: Request, response: Response): Promise<Response> {
    const {id} = request.user;
    const { quote_id } = request.params;
    const {partner_notes, service_description, service_price, status, franchise_price} = request.body;

    console.log(request.body);

    const updateRegularQuoteUseCase = container.resolve(UpdateRegularQuoteUseCase);

    const quote = await updateRegularQuoteUseCase.execute(id, quote_id, {partner_notes, service_description, service_price, status, franchise_price});

    return response.status(200).json(quote);
  }
}