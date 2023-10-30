import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindLegalQuoteDocumentsUseCase{
  constructor(
    @inject("LegalQuotesRepository")
    private legalQuotesRepository: ILegalQuoteRepository
  ){}

  async execute(hashId: string){
    const documents = await this.legalQuotesRepository.findQuoteDocuments(hashId);

    return documents;
  }
}