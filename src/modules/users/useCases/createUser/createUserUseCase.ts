import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  last_name: string;
  cpf: string;
  mobile_phone: string;
  birth_date: Date;
  username: string;
  genderId: number;
  email: string;
  password: string;
  isPartner: boolean;
  isTermsAccepted: boolean,
}

interface IUserCreationResponse {
  id: string;
  name: string;
  last_name: string;
  email: string;
  username: string;
  isPartner: boolean | undefined;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    last_name,
    cpf,
    mobile_phone,
    birth_date,
    username,
    email,
    genderId,
    password,
    isPartner,
    isTermsAccepted,
  }: IRequest): Promise<IUserCreationResponse> {

    let userExist = await this.usersRepository.findByCPF(cpf);

    if (userExist) {
      throw new AppError("CPF já cadastrado!");
    }

    userExist = await this.usersRepository.findByMobilePhone(mobile_phone);

    if (userExist) {
      throw new AppError("Numero de telefone em uso!");
    }

    userExist = await this.usersRepository.findByUsername(username);

    if (userExist) {
      throw new AppError("Nome de usuario em uso!");
    }

    userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError("Endereco de email em uso!");
    }

    const user = await this.usersRepository.create({
      name,
      last_name,
      cpf,
      mobile_phone,
      birth_date,
      username,
      genderId,
      email,
      password,
      isPartner,
      isTermsAccepted,
    });

    return {
      id: String(user.id),
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      isPartner: user.isPartner,
    };
  }
}
