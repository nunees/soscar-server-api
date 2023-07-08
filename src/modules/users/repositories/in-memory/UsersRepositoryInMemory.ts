import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";
import { User } from "@modules/users/entities/User";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private static INSTANCE: UsersRepositoryInMemory;
  users: User[] = [];

  constructor() {
    this.users = [];
  }

  async create({
    id,
    name,
    last_name,
    cpf,
    mobile_phone,
    birth_date,
    username,
    email,
    password,
  }: IUserCreateDTO): Promise<IUserReturnDTO> {
    const userExist = await this.findByCPF(cpf);
    if (userExist) {
      throw new AppError("Usuário já existe!");
    }

    const user = {
      id,
      name,
      last_name,
      cpf,
      mobile_phone,
      birth_date,
      username,
      email,
      password,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findByCPF(cpf: string): Promise<IUserReturnDTO> {
    return this.users.find((user) => user.cpf === cpf) as IUserReturnDTO;
  }
}
