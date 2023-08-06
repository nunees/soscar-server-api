import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { message } from "@shared/lang/pt-br/String";

@injectable()
export class FetchAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<string> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error(message.UserNotFound);
    }

    return user.avatar as string;
  }
}
