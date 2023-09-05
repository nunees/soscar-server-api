import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeletePhotoUseCase {
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ) {}

  async execute(photo_id: string): Promise<void> {
    await this.locationsRepository.deletePhoto(photo_id);
  }
}