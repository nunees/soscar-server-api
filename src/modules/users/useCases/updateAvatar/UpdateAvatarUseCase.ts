import { IAvatarDTO } from "@modules/users/dtos/IAvatarDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<IAvatarDTO> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./upload/avatar/${user.avatar}`);
    }

    const avatar = await this.usersRepository.updateAvatar(user_id, avatar_file);

    return avatar;
  }
}
