import { IAvatarDTO } from "@modules/users/dtos/IAvatarDTO";
import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";
import { IUpdateUserDTO } from "@modules/users/dtos/IUserUpdateDTO";
import { User } from "@modules/users/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { message } from "@shared/lang/pt-br/String";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { idText } from "typescript";

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ) {}

  async fetchAvatar(id: string, avatar_file: string): Promise<string | null> {
    const avatar = await this.prismaClient.users.findFirst({
      where: {
        id,
        AND: {
          avatar: avatar_file,
        }
      }
    });

    console.log(avatar)

    if(!avatar){
      return null;
    }

    return avatar?.avatar as string;
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
    avatar,
    genderId,
    isTermsAccepted,
  }: IUserCreateDTO): Promise<IUserReturnDTO> {

    try{
      const hashed_password = await hash(String(password), 8);

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
          avatar: avatar || null,
          genderId,
          isTermsAccepted,
        },
      });

      return {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        isPartner: user.isPartner,
        avatar: user.avatar,
      } as IUserReturnDTO;
    }catch(error){
      console.log(error);
      throw new AppError(error.message);
    }
  }

  async findByCPF(cpf: string): Promise<IUserReturnDTO> {

    try {
      const user = await this.prismaClient.users.findUnique({
        where: {
          cpf,
        },
      });

      return user as IUserReturnDTO;
    } catch (error) {
      console.log(error)
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
      return user as IUserReturnDTO;
    } catch (error) {
      console.log(error)
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

      return user as IUserReturnDTO;
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

  async updateAvatar(user_id: string, avatar_file: string): Promise<IAvatarDTO> {
    try {
      const avatar = await this.prismaClient.users.update({
        data: {
          avatar: avatar_file,
        },
        where: {
          id: user_id,
        },
      });
      return {
        user_id: avatar.id,
        avatar: avatar.avatar,
      } as IAvatarDTO;
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

  async fetchUserProfile(user_id: string): Promise<User> {
    try {
      const user = await this.prismaClient.users.findUnique({
        where: {
          id: user_id,
        }
      });

      return user as User;
    } catch (error) {
      throw new AppError(message.ErrorFetchingData);
    }
  }

 async update(user_id: string, user: IUpdateUserDTO): Promise<IUserReturnDTO> {
  console.log({user});
    try{
      const result = await this.prismaClient.users.update({
        where: {
          id: user_id,
        },
        data: {
          name: user.name,
          last_name: user.last_name,
          username: user.username,
          mobile_phone: user.mobile_phone,
          birth_date: user.birth_date,
        }
      });

      return result as IUserReturnDTO;
    }catch(error){
      console.log(error.message);
      throw new AppError("Erro ao atualizar usuário!")
    }
  }
}
