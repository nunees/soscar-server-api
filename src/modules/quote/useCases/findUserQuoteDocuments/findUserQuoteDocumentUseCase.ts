import { QuotesDocument } from "@modules/quote/entities/QuotesDocuments";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FindUserQuoteDocumentUseCase{
  constructor(
    @inject("QuotesRepository")
    private quotesRepository: IQuotesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute(user_id: string, quote_id: string): Promise<QuotesDocument>{
    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new Error("Usuário não encontrado");
    }

    const quote = await this.quotesRepository.findUserQuoteDocumentById(user_id, quote_id);

    if(!quote){
      throw new Error("Cotação não encontrada");
    }

    return quote;
  }
}