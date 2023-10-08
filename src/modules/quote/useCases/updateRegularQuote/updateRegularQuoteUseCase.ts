import { IUpdateRegularQuoteDTO } from "@modules/quote/dtos/IUpdateRegularQuoteDTO";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateRegularQuoteUseCase{
  constructor(
    @inject("QuotesRepository")
    private quotesRepository: IQuotesRepository,
  ){}

  async execute(user_id: string, quote_id: string, data: IUpdateRegularQuoteDTO){

    const quote = await this.quotesRepository.updateRegularQuote(user_id,quote_id, data);

    return quote;
  }
}