import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id?: string;
  name: string;
  last_name: string;
  cpf: string;
  mobile_phone: string;
  birth_date: Date;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepositoryInMemory")
    private usersRepositoryInMemory: IUsersRepository
  ) {}

  async execute({
    id,
    name,
    last_name,
    cpf,
    mobile_phone,
    birth_date,
    username,
    email,
    password,
  }: IRequest): Promise<IUserReturnDTO> {
    try {
      const user = await this.usersRepositoryInMemory.create({
        id,
        name,
        last_name,
        cpf,
        mobile_phone,
        birth_date,
        username,
        email,
        password,
      });

      return user;
    } catch (error) {
      throw new AppError("Cannot create the user");
    }
  }
}
