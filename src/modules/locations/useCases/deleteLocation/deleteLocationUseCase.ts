import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteLocationUseCase{
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute(user_id: string, location_id: string): Promise<void>{
    const userExists = await this.usersRepository.findById(user_id);

    if(!userExists){
      throw new Error("User does not exists");
    }

    if(!userExists.isPartner){
      throw new Error("User is not a partner");
    }

    await this.locationsRepository.delete(location_id);
  }
}