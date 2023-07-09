import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ) {}

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
    avatar,
    gender,
  }: IUserCreateDTO): Promise<IUserReturnDTO> {
    const hashed_password = await hash(password, 8);

    const user = await this.prismaClient.users.create({
      data: {
        name,
        last_name,
        cpf,
        mobile_phone,
        birth_date,
        username,
        email,
        password: hashed_password,
        isPartner,
        avatar,
        gender,
      },
    });

    user.password = "**********";
    return user as IUserCreateDTO;
  }
  async findByCPF(cpf: string): Promise<IUserReturnDTO> {
    try {
      console.log("user");
      const user = await this.prismaClient.users.findUnique({
        where: {
          cpf,
        },
      });

      return user as IUserCreateDTO;
    } catch (error) {
      throw new AppError("Não foi possível realizar a consulta");
    }
  }

  async findByMobilePhone(mobile_phone: string): Promise<IUserReturnDTO> {
    try {
      const user = await this.prismaClient.users.findUnique({
        where: {
          mobile_phone,
        },
      });

      return user as IUserCreateDTO;
    } catch (error) {
      throw new AppError("Não foi possível realizar a consulta");
    }
  }
  async findByUsername(username: string): Promise<IUserReturnDTO> {
    try {
      const user = await this.prismaClient.users.findUnique({
        where: {
          username,
        },
      });

      return user as IUserCreateDTO;
    } catch (error) {
      throw new AppError("Não foi possível realizar a consulta");
    }
  }
  async findByEmail(email: string): Promise<IUserReturnDTO> {
    try {
      const user = await this.prismaClient.users.findUnique({
        where: {
          email,
        },
      });

      return user as IUserCreateDTO;
    } catch (error) {
      throw new AppError("Não foi possível realizar a consulta");
    }
  }
}
