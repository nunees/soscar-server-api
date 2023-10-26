import { IReturnQuote } from "@modules/quote/dtos/IReturnQuote";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FindAllUserQuotesUseCase{
  constructor(
    @inject("QuotesRepository")
    private quotesRepository: IQuotesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute(user_id: string, user_type: string): Promise<IReturnQuote[]>{

    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new Error("User not found!");
    }

    const quotes = await this.quotesRepository.findAllUserQuotes(user_id, user_type);

    return quotes;
  }
}