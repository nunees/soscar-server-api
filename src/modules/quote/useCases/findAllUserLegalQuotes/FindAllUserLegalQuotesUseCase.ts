import { LegalQuote } from "@modules/quote/entities/LegalQuote";
import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FindAllUserLegalQuotesUseCase{
  constructor(
    @inject("LegalQuotesRepository")
    private legalQuotesRepository: ILegalQuoteRepository
  ){}

  async execute(user_id: string): Promise<LegalQuote[]>{
    const quotes = await this.legalQuotesRepository.findAllUserLegalQuotes(user_id);

    return quotes;
  }
}