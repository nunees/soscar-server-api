import { ILocationDTO } from "@modules/locations/dtos/ILocationDTO";
import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllLocationsUseCase {
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ) {}

  async execute(user_id: string): Promise<ILocationDTO[]> {
    const locations = await this.locationsRepository.findAll(user_id);

    if (!locations) throw new AppError("Local não encontrado");

    return locations;
  }
}
