import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { LegalQuote } from "@modules/quote/entities/LegalQuote";
import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllPartnerLegalQuotesUseCase{
 constructor(
  @inject("LegalQuotesRepository")
  private legalQuotesRepository: ILegalQuoteRepository,
  @inject("UsersRepository")
  private usersRepository: IUsersRepository,
  @inject("LocationsRepository")
  private locationsRepository: ILocationsRepository
 ){}

  async execute(user_id: string): Promise<LegalQuote[]>{
    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new Error("User not found");
    }

    const locations = await this.locationsRepository.findLocationsByUserId(user_id);

    if(!locations){
      throw new Error("Locations not found");
    }

    const ids = locations.map(location => location.id);

    if(ids.length === 0){
      throw new Error("Locations not found");
    }

    const legalQuotes: LegalQuote[] = [];

    for(let i = 0; i < ids.length; i++){
      const quotes = await this.legalQuotesRepository.findAllByLocation(ids[i] as string);

      legalQuotes.push(...quotes);
    }

    return legalQuotes;

  }
}