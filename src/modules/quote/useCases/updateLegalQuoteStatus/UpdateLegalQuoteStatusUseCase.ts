import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateLegalQuoteStatusUseCase{
  constructor(
    @inject("LegalQuotesRepository")
    private legalQuotesRepository: ILegalQuoteRepository
  ){}

  async execute(user_id: string, quote_id: string, status: number): Promise<void>{
    console.log("In use case: update legal quote status", quote_id)

    const quote = await this.legalQuotesRepository.findById(quote_id);

    if(!quote){
      throw new Error("Quote not found");
    }

    await this.legalQuotesRepository.updateStatus(quote_id, status);
  }
}