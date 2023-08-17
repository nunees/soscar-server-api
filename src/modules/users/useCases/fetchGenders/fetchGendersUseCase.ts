import { Genders } from "@modules/users/entities/Genders";
import { IGendersRepository } from "@modules/users/repositories/IGendersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchGendersUseCase {
  constructor(
    @inject("GendersRepository")
    private gendersRepository: IGendersRepository
  ) {}

  async execute(): Promise<Genders[]> {
    const genders = await this.gendersRepository.fetch();

    return genders;
  }
}
