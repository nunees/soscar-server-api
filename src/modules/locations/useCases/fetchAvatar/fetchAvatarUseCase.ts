import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchAvatarUseCase {
  constructor(
   @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository,
  ) {}

  async execute(location_id: string, avatar_id: string, ): Promise<string> {
    const avatar = await this.locationsRepository.fetchAvatar(location_id, avatar_id);

    if(!avatar){
      throw new Error("Avatar não encontrado");
    }

    return avatar;
  }
}
