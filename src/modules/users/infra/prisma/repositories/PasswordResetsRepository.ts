import { ICreatePasswordRecoverDTO } from "@modules/users/dtos/ICreatePasswordRecoverDTO";
import { PasswordReset } from "@modules/users/entities/PasswordReset";
import { IPasswordResetsRepository } from "@modules/users/repositories/IPasswordResetsRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
export class PasswordResetsRepository implements IPasswordResetsRepository{
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ){}

  async create(data: ICreatePasswordRecoverDTO): Promise<PasswordReset> {
    try{
      const passwordReset = await this.prismaClient.passwordResets.create({
        data: {
          ...data
        }
      })

      return passwordReset as PasswordReset;
    }catch(error){
      throw new AppError("Ocorreu um erro ao gerar o token de recuperação de senha.")
    }
  }


  async findByUserIdAndCode(user_id: string, code: string): Promise<PasswordReset> {
    try{
      const response = await this.prismaClient.passwordResets.findFirst({
        where: {
          user_id,
          AND: {
            code
          }
        }
      })

      return response as PasswordReset;
    }catch(error){
      throw new AppError("Ocorreu um erro ao encontrar o token de recuperação de senha.")
    }
  }


  async delete(id: string): Promise<void> {
    try{
      await this.prismaClient.passwordResets.delete({
        where: {
          id
        }
      })
    }catch(error){
      throw new AppError("Ocorreu um erro ao deletar o token de recuperação de senha.")
    }
  }

}