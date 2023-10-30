import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FindAllByLocationUseCase {
  constructor(
    @inject("LegalQuotesRepository")
    private legalQuotesRepository: ILegalQuoteRepository,
    @inject("LocationsRepository")
    private locationsRepository: ILegalQuoteRepository
  ){}

  async execute(location_id: string){
    const location = await this.locationsRepository.findById(location_id);
    if(!location){
      throw new Error("Location not found");
    }

    const quotes = await this.legalQuotesRepository.findAllByLocation(location_id);

    return quotes;
  }
}