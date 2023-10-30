import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindLocationsByUserIdUseCase{
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute(user_id: string){
    const user = await this.usersRepository.findById(user_id);
    if(!user){
      throw new Error("User not found");
    }

    const locations = await this.locationsRepository.findLocationsByUserId(user_id);
    return locations;
  }
}