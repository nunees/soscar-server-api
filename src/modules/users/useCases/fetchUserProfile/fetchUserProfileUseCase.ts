import { User } from "@modules/users/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User> {
    try {
      const profile = await this.usersRepository.fetchUserProfile(id);

      if (!profile) {
        throw new Error("Perfil não encontrado");
      }

      return profile;
    } catch (error) {
      throw new AppError("Internal server error", 500);
    }
  }
}
