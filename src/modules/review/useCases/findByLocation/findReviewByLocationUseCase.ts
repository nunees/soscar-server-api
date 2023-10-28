import { IReturnDTO } from "@modules/review/dtos/IReturnDTO";
import { IReviewsRepository } from "@modules/review/repositories/IReviewsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindReviewByLocationUseCase{
  constructor(
    @inject("ReviewsRepository")
    private reviewsRepository: IReviewsRepository
  ){}

  async execute(location_id: string): Promise<IReturnDTO[]>{
    const reviews = await this.reviewsRepository.findAll(location_id);
    return reviews;
  }
}