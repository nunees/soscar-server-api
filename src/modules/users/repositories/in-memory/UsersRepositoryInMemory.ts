import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";
import { User } from "@modules/users/entities/User";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  constructor() {
    this.users = [];
  }

  async create({
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
    const hashed_password = await hash(password, 8);
    const user = {
      id: uuid(),
      name,
      last_name,
      cpf,
      mobile_phone,
      birth_date,
      username,
      email,
      password: hashed_password,
      isPartner,
      created_at: new Date(),
    };

    this.users.push(user);

    return user as IUserReturnDTO;
  }

  async isUserPartner(user_id: string, isPartner: boolean): Promise<Boolean> {
    const partner = this.users.find(
      (user) => user.id === user_id && user.isPartner === isPartner
    )!;
    if (partner.isPartner) {
      return true;
    }
    return false;
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

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)!;
  }

  async findById(user_id: string): Promise<IUserReturnDTO> {
    const user = this.users.find((user) => user.id === user_id)!;
    return user as IUserReturnDTO;
  }

  delete(user_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateAvatar(user_id: string, avatar_file: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
