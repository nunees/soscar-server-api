import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FIndAllLegalQuotesUseCase {
  constructor(
    @inject("LegalQuotesRepository")
    private legalQuotesRepository: ILegalQuoteRepository
  ){}

  async execute(user_id: string){
    const user = await this.legalQuotesRepository.findById(user_id);
    if(!user){
      throw new Error("User not found");
    }

    const quotes = await this.legalQuotesRepository.findAllLegalQuotes();

    return quotes;
  }
}