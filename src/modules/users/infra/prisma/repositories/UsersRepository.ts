import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { injectable } from "tsyringe";

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor() {} // private prismaClient: PrismaClient // @inject("PrismaClient")

  create({
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
    throw new Error("Method not implemented.");
  }
  findByCPF(cpf: string): Promise<IUserReturnDTO> {
    throw new Error("Method not implemented.");
  }

  findByMobilePhone(mobile_phone: string): Promise<IUserReturnDTO> {
    throw new Error("Method not implemented.");
  }
  findByUsername(username: string): Promise<IUserReturnDTO> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<IUserReturnDTO> {
    throw new Error("Method not implemented.");
  }
}
