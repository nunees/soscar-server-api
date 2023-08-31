import { inject, injectable } from "tsyringe";
import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { ILocationDTO } from "@modules/locations/dtos/ILocationDTO";

@injectable()
export class FindLocationUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("LocationsRepository")
    private locationRepository: ILocationsRepository
  ) {}

  async execute(id: string, location_id: string): Promise<ILocationDTO> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) throw new AppError("Usuário não encontrado");

    const location = await this.locationRepository.findById(location_id);

    if (!location) throw new AppError("Local não encontrado");

    return location;
  }
}
