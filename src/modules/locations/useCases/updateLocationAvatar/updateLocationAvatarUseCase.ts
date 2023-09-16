import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";

import { inject, injectable } from "tsyringe";

interface IRequest {
    location_id: string;
    avatar_file: string;
  }


@injectable()
export class UpdateLocationAvatarUseCase {
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository

  ) {}

  async execute({ location_id, avatar_file }: IRequest): Promise<void> {
    //const user = await this.usersRepository.findById(user_id);

    const location = await this.locationsRepository.findById(location_id);

    if (location.avatar) {
      await deleteFile(`./upload/avatar/${location.avatar}`);
    }

    await this.locationsRepository.updateAvatar(location_id, avatar_file);
  }
}