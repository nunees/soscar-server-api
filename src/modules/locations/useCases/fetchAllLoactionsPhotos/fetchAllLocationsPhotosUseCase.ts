import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { inject, injectable } from "tsyringe";

type Request  = {
  location_id: string;
  photo_file: string;
}

@injectable()
export class FetchAllLocationsPhotosUseCase{
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ){}

  async execute({location_id, photo_file}: Request): Promise<string>{
    const photos = await this.locationsRepository.fetchPhotos(location_id, photo_file);

    return photos;
  }
}