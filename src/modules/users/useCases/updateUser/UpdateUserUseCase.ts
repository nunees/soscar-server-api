import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string, user: IUserCreateDTO): Promise<void> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error("Usuario não existe!");
    }

    userExists.name = user.name || userExists.name;
    userExists.last_name = user.last_name || userExists.last_name;
    userExists.cpf = user.cpf || userExists.cpf;
    userExists.mobile_phone = user.mobile_phone || userExists.mobile_phone;
    userExists.birth_date = user.birth_date || userExists.birth_date;
    userExists.username = user.username || userExists.username;
    userExists.email = user.email || userExists.email;
    userExists.isPartner = user.isPartner || userExists.isPartner;
    userExists.avatar = user.avatar || userExists.avatar;
    userExists.genderId = user.genderId || userExists.genderId;

    await this.usersRepository.update(user_id, userExists);
  }
}
