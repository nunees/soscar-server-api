import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateLegalDocumentOwnerUseCase{
  constructor(
    @inject("LegalQuotesRepository")
    private legalDocumentsRepository: ILegalQuoteRepository,
  ){}
  async execute(document_id: string): Promise<void>{

    await this.legalDocumentsRepository.updateDocumentOwner(document_id);
  }
}