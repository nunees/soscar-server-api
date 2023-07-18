import { IUserAddressReturnDTO } from "@modules/users/dtos/IUserAddressReturnDTO";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllAddresses {
  constructor(
    @inject("UsersRepositoryInMemory")
    private usersRepositoryInMemory: IUsersRepository,
    @inject("AddressesRepositoryInMemory")
    private addressesRepositoryInMemory: IAddressRepository
  ) {}

  async execute(user_id: string): Promise<IUserAddressReturnDTO[]> {
    const addresses = await this.addressesRepositoryInMemory.findAllAddresses(
      user_id
    );

    return addresses;
  }
}
