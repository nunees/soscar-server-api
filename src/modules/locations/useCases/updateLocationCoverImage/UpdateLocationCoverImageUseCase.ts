import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";


interface IRequest {
    location_id: string;
    cover_file: string;
  }


@injectable()
export class UpdateLocationCoverImageUseCase {
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository,

  ) {}

  async execute({ location_id, cover_file }: IRequest): Promise<void> {
    const location = await this.locationsRepository.findById(location_id);

    if (location.cover_photo) {
      await deleteFile(`./upload/locations/${location.cover_photo}`);
    }

    await this.locationsRepository.updateCoverImage(location_id, cover_file);
  }
}