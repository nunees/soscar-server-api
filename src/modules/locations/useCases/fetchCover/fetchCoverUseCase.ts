import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchCoverUseCase {
  constructor(
   @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository,
  ) {}

  async execute(location_id: string, cover_file: string, ): Promise<string> {
    const cover = await this.locationsRepository.fetchCoverImage(location_id, cover_file);

    if(!cover){
      throw new Error("Avatar não encontrado");
    }

    return cover;
  }
}
