import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllLocationsUseCase {
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ) {}

  async execute(location_id: string): Promise<Location[]> {
    const locations = await this.locationsRepository.findAll(location_id);

    if (!locations) throw new AppError("Local não encontrado");

    return locations;
  }
}
