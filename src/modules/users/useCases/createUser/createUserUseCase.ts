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
  isPartner: boolean;
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
    isPartner,
  }: IRequest): Promise<IUserReturnDTO> {
    let userExist = await this.usersRepositoryInMemory.findByCPF(cpf);

    if (userExist) {
      throw new AppError("CPF já cadastrado!");
    }

    userExist = await this.usersRepositoryInMemory.findByMobilePhone(
      mobile_phone
    );

    if (userExist) {
      throw new AppError("Numero de telefone em uso!");
    }

    userExist = await this.usersRepositoryInMemory.findByUsername(username);

    if (userExist) {
      throw new AppError("Nome de usuario em uso!");
    }

    userExist = await this.usersRepositoryInMemory.findByEmail(email);

    if (userExist) {
      throw new AppError("Endereco de email em uso!");
    }

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
      isPartner,
    });

    return user as IUserReturnDTO;
  }
}
