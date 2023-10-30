import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchLegalDocumentUseCase{
  constructor(
    @inject("LegalQuotesRepository")
    private legalQuotesRepository: ILegalQuoteRepository
  ){}

  async execute( document_id: string, hashId: string): Promise<string>{
    const document = await this.legalQuotesRepository.fetchDocument(hashId, document_id);

    if(!document){
        throw new Error("Documento não encontrado");
    }

    return document;
  }
}