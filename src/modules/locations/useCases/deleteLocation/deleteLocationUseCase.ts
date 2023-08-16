import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

injectable();
export class DeleteLocationUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("LocationRepository")
    private locationRepository: ILocationsRepository
  ) {}

  async execute(id: string, location_id: string): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) throw new Error("Usuário não encontrado");

    const location = await this.locationRepository.findById(location_id);

    if (!location) {
      throw new Error("Local não encontrado");
    }

    await this.locationRepository.delete(id);
  }
}
