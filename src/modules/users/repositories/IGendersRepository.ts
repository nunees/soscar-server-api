import { Genders } from "../entities/Genders";

export interface IGendersRepository {
  fetch(): Promise<Genders[]>;
}
