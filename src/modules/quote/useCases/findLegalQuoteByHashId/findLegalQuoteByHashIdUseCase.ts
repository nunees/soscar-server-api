import { LegalQuote } from "@modules/quote/entities/LegalQuote";
import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FindLegalQuoteByHashIdUseCase{
  constructor(
    @inject("LegalQuotesRepository")
    private legalQuotesRepository: ILegalQuoteRepository,
  ){}

  async execute(id: string, hash_id: string): Promise<LegalQuote[]>{

    const quotes = await this.legalQuotesRepository.findByHashId(id, hash_id);

    return quotes;
  }
}