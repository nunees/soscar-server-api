import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { inject, injectable } from "tsyringe";
@injectable()
export class UpdateBusinessPhotoUseCase{
  constructor( @inject("LocationsRepository")
  private locationsRepository: ILocationsRepository){}

  async execute(location_id: string, photo_file: string): Promise<void>{
    await this.locationsRepository.uploadPhotos(location_id, photo_file)
  }

}