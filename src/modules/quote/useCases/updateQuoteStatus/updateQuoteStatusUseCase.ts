import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateQuoteStatusUseCase{
  constructor(
    @inject("QuotesRepository")
    private quotesRepository: IQuotesRepository,
  ){}

  async execute(user_id: string, quote_id: string, status: number){

      const quote = await this.quotesRepository.updateQuoteStatus(user_id,quote_id, status);

      return quote;
  }
}