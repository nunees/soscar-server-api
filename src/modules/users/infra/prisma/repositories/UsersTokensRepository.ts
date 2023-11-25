import { IUserTokenCreateDTO } from "@modules/users/dtos/IUserTokenCreateDTO";
import { IUserTokenReturnDTO } from "@modules/users/dtos/IUserTokenReturnDTO";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
export class UsersTokensRepository implements IUsersTokensRepository {
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ) {}


  async create({
    expires_date,
    refresh_token,
    user_id,
    code,
  }: IUserTokenCreateDTO): Promise<IUserTokenReturnDTO> {
    const userToken = await this.prismaClient.usersTokens.create({
      data: {
        user_id,
        refresh_token,
        code,
        expires_date: new Date(expires_date),
      },
    });
    return userToken as IUserTokenReturnDTO;
  }

  async findByUserId(user_id: string): Promise<IUserTokenReturnDTO> {
    const userToken = await this.prismaClient.usersTokens.findFirst({
      where: {
        user_id,
      },
    });

    return userToken as IUserTokenReturnDTO;
  }

  async findByUserIdAndRefreshToken(
    id: string,
    refresh_token: string
  ): Promise<IUserTokenReturnDTO> {
    const userToken = await this.prismaClient.usersTokens.findFirst({
      where: {
        user_id: id,
        AND: {
          refresh_token,
        },
      },
    });

    return userToken as IUserTokenReturnDTO;
  }

  async findByRefreshToken(
    refresh_token: string
  ): Promise<IUserTokenReturnDTO> {
    const userToken = await this.prismaClient.usersTokens.findFirst({
      where: {
        refresh_token,
      },
    });

    return userToken as IUserTokenReturnDTO;
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaClient.usersTokens.delete({
      where: {
        id,
      },
    });
  }


}
