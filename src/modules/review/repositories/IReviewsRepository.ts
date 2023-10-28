import { IReturnDTO } from "../dtos/IReturnDTO";
import { ICreateReviewDTO } from "../dtos/IReviewDTO";
import { Review } from "../entities/Review";

export interface IReviewsRepository {
  create(review: ICreateReviewDTO): Promise<void>;
  findAll(location_id: string): Promise<IReturnDTO[]>;
}