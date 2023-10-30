import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindLegalQuoteByIdUse{
 constructor(
  @inject("LegalQuotesRepository")
  private legalQuotesRepository: ILegalQuoteRepository,
  @inject("UsersRepository")
  private usersRepository: IUsersRepository
 ){}

 async execute(id: string, quote_id: string){
  const user = await this.usersRepository.findById(id);

  if(!user){
   throw new Error("Usuário não encontrado");
  }

  const quote = await this.legalQuotesRepository.findById(quote_id);

  return quote;
 }
}