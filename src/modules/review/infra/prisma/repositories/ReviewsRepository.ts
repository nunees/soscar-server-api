import { IReturnDTO } from "@modules/review/dtos/IReturnDTO";
import { ICreateReviewDTO } from "@modules/review/dtos/IReviewDTO";
import { Review } from "@modules/review/entities/Review";
import { IReviewsRepository } from "@modules/review/repositories/IReviewsRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
export class ReviewsRepository implements IReviewsRepository{
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ){}

  async create(review: ICreateReviewDTO): Promise<void> {
    try{
      await this.prismaClient.reviews.create({
        data: {
         ...review
        }
      });

    }catch(error){
      throw new AppError("Erro ao criar review");
    }
  }

  async findAll(location_id: string): Promise<IReturnDTO[]> {
    try{
      const results = await this.prismaClient.reviews.findMany({
        where: {
          location_id
        },
        include: {
          users: true
        }
      });

      return results;

    }catch(error){
      throw new AppError("Erro ao buscar reviews");
    }

  }

}