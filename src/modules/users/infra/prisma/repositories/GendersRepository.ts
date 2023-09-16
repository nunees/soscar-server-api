import { Genders } from "@modules/users/entities/Genders";
import { IGendersRepository } from "@modules/users/repositories/IGendersRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GendersRepository implements IGendersRepository {
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ) {}

  async fetch(): Promise<Genders[]> {
    try {

      const genders = await this.prismaClient.usersGenders.findMany();

      return genders;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
