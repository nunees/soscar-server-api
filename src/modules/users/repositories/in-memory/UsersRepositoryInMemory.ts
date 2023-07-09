import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";
import { User } from "@modules/users/entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
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
    isPartner,
  }: IUserCreateDTO): Promise<IUserReturnDTO> {
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
      isPartner,
      created_at: new Date(),
    };

    this.users.push(user);

    return user as IUserReturnDTO;
  }

  async findByCPF(cpf: string): Promise<IUserReturnDTO> {
    const user = this.users.find((user) => user.cpf === cpf)!;
    return user as IUserReturnDTO;
  }

  async findByMobilePhone(mobile_phone: string): Promise<IUserReturnDTO> {
    const user = this.users.find((user) => user.mobile_phone === mobile_phone)!;
    return user as IUserReturnDTO;
  }

  async findByUsername(username: string): Promise<IUserReturnDTO> {
    const user = this.users.find((user) => user.username === username)!;
    return user as IUserReturnDTO;
  }

  async findByEmail(email: string): Promise<IUserReturnDTO> {
    const user = this.users.find((user) => user.email === email)!;
    return user as IUserReturnDTO;
  }
}
