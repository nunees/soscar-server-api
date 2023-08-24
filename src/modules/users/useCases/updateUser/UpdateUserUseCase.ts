import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
  name: string;
  last_name: string;
  mobile_phone: string;
  username: string;
  birth_date: Date;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string, {
    name,
    last_name,
    mobile_phone,
    username,
    birth_date,
  }: IRequest): Promise<void> {

    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error("Usuario não existe!");
    }

    await this.usersRepository.update(user_id, {
      name,
      last_name,
      mobile_phone,
      username,
      birth_date,
    });
  }
}
