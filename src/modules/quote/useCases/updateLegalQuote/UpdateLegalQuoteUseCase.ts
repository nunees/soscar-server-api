import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


type IRequest = {
  user_id: string;
  quote_id: string;
  franchise_price: number;
  service_price: number;
  service_description: string;
  partner_notes: string;
  status: number;
}


@injectable()
export class UpdateLegalQuoteUseCase{
  constructor(
    @inject("LegalQuotesRepository")
    private legalQuotesRepository: ILegalQuoteRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({ user_id, quote_id, franchise_price, service_price, service_description, partner_notes, status}: IRequest){
    const users = await this.usersRepository.findById(user_id);

    if(!users){
      throw new Error("User not found");
    }

    await this.legalQuotesRepository.updateLegalQuote(quote_id, franchise_price, service_price, service_description, partner_notes, status);

  }
}