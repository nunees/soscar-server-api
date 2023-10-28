import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IReviewsRepository } from "@modules/review/repositories/IReviewsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


type Request = {
  user_id: string;
  location_id: string;
  rating: number;
  review: string;
}

@injectable()
export class CreateReviewUseCase{
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository,
    @inject("ReviewsRepository")
    private reviewsRepository: IReviewsRepository
  ){}

  async execute({user_id, location_id, rating, review}: Request): Promise<void>{
    const user = await this.usersRepository.findById(user_id);
    if(!user){
      throw new Error("Usuario não encontrado");
    }

    const location = await this.locationsRepository.findById(location_id);
    if(!location){
      throw new Error("Local não encontrado");
    }

    await this.reviewsRepository.create({
      user_id,
      location_id,
      rating,
      review
    });
  }
}