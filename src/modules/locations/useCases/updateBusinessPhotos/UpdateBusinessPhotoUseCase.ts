import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest{
  location_id: string;
  photos_files: string[];
}

@injectable()
export class UpdateBusinessPhotoUseCase{
  constructor( @inject("LocationsRepository")
  private locationsRepository: ILocationsRepository){}

  async execute({ location_id, photos_files }: IRequest): Promise<void>{
    await this.locationsRepository.uploadPhotos(location_id, photos_files)
  }

}