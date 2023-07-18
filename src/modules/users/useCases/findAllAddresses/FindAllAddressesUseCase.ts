import { IUserAddressReturnDTO } from "@modules/users/dtos/IUserAddressReturnDTO";
import { User } from "@modules/users/entities/User";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllAddressesUseCase {
  constructor(
    @inject("AddressesRepository")
    private usersAddressesRepository: IAddressRepository
  ) {}

  async execute(user_id: string): Promise<IUserAddressReturnDTO[]> {
    const userAddresses = await this.usersAddressesRepository.findAllAddresses(
      user_id
    );

    return userAddresses;
  }
}
