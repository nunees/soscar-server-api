import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindLocationsByServiceUseCase{
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ){}

  async execute(service: number): Promise<Location[] | null>{
    const locations = await this.locationsRepository.findLocationByService(service);

    return locations as Location[] | null;
  }
}