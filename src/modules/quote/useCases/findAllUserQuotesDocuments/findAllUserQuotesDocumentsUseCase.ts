import { QuotesDocument } from "@modules/quote/entities/QuotesDocuments";
import { UserQuoteDocument } from "@modules/quote/entities/UserQuotesDocuments";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { User } from "@modules/users/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllUserQuotesDocumentsUseCase{
  constructor(
    @inject("QuotesRepository")
    private quotesRepository: IQuotesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute(user_id: string): Promise<QuotesDocument[]>{
    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new Error("Usuário não encontrado");
    }

    const quotes = await this.quotesRepository.findAllUserQuotesDocuments(user_id);

    return quotes;
  }
}