import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, avatar_id: string): Promise<string> {
    const avatar = await this.usersRepository.fetchAvatar(id, avatar_id);

    if(!avatar){
      throw new Error("Avatar não encontrado");
    }

    return avatar;
  }
}
