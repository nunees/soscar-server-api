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

  async updatePassword(user_id: string, password: string): Promise<void> {
    try{
      await this.prismaClient.users.update({
        where: {
          id: user_id
        },
        data: {
          password
        }
      });
    }catch(error){

      throw new AppError("Erro ao atualizar senha!");
    }
  }

  async fetchAvatar(id: string, avatar_file: string): Promise<string | null> {
    const avatar = await this.prismaClient.users.findFirst({
      where: {
        id,
        AND: {
          avatar: avatar_file,
        }
      }
    });

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

      throw new AppError("Erro ao criar usuário!");
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

      throw new AppError("Erro ao buscar usuário!");
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

      throw new AppError("Erro ao buscar usuário!");
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
      throw new AppError("Erro ao buscar usuário!");
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
      throw new AppError("Erro ao buscar usuário!");
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
      throw new AppError("Erro ao buscar usuário!");
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
      throw new AppError("Erro ao buscar usuário!");
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
      throw new AppError("Erro ao atualizar avatar!");
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
      throw new AppError("Erro ao deletar usuário!");
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
      throw new AppError("Erro ao buscar usuário!");
    }
  }

 async update(user_id: string, user: IUpdateUserDTO): Promise<IUserReturnDTO> {

    try{
      const userFound = await this.prismaClient.users.findUnique({
        where: {
          id: user_id
        }
      });

      if(!userFound){
        throw new AppError("Usuário não encontrado!");
      }

      const result = await this.prismaClient.users.update({
        where: {
          id: user_id,
        },
        data: {
          name: user.name ?? userFound.name,
          last_name: user.last_name ?? userFound.last_name,
          username: user.username ?? userFound.username,
          mobile_phone: user.mobile_phone ?? userFound.mobile_phone,
          birth_date: user.birth_date ?? userFound.birth_date,
          isPartner: user.isPartner ?? userFound.isPartner,
        }
      });

      return result as IUserReturnDTO;
    }catch(error){

      throw new AppError("Erro ao atualizar usuário!")
    }
  }
}
