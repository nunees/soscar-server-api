import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";
import { User } from "@modules/users/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { message } from "@shared/lang/pt-br/String";
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

    return {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
    } as IUserCreateDTO;
  }

  async findByCPF(cpf: string): Promise<IUserReturnDTO> {
    try {
      const user = await this.prismaClient.users.findUnique({
        where: {
          cpf,
        },
      });

      return user as IUserCreateDTO;
    } catch (error) {
      throw new AppError(message.ErrorFetchingData);
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
      throw new AppError(message.ErrorFetchingData);
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
      throw new AppError(message.ErrorFetchingData);
    }
  }
  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.prismaClient.users.findUnique({
        where: {
          email,
        },
      });
      return user as User;
    } catch (error) {
      throw new AppError(message.ErrorFetchingData);
    }
  }

  async findById(user_id: string): Promise<IUserReturnDTO> {
    try {
      const user = await this.prismaClient.users.findUnique({
        where: {
          id: user_id,
        },
      });

      return user as IUserReturnDTO;
    } catch (error) {
      throw new AppError(message.ErrorFetchingData);
    }
  }

  async isUserPartner(user_id: string, isPartner: boolean): Promise<boolean> {
    try {
      const partner = await this.prismaClient.users.findFirst({
        where: {
          id: user_id,
          AND: {
            isPartner,
          },
        },
      });

      if (!partner) {
        return false;
      }

      return true;
    } catch (error) {
      throw new AppError(message.ErrorFetchingData);
    }
  }

  async updateAvatar(user_id: string, avatar_file: string): Promise<void> {
    try {
      await this.prismaClient.users.update({
        data: {
          avatar: avatar_file,
        },
        where: {
          id: user_id,
        },
      });
    } catch (error) {
      throw new AppError(message.ErrorFetchingData);
    }
  }

  async delete(user_id: string): Promise<void> {
    try {
      await this.prismaClient.users.delete({
        where: {
          id: user_id,
        },
      });
    } catch (error) {
      throw new AppError(message.ErrorFetchingData);
    }
  }
}
