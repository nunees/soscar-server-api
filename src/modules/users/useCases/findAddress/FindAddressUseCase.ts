import { IUserAddressReturnDTO } from "@modules/users/dtos/IUserAddressReturnDTO";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAddressUseCase {
  constructor(
    @inject("AddressesRepository")
    private usersAddressesRepository: IAddressRepository
  ) {}

  async execute(address_id: string): Promise<IUserAddressReturnDTO> {
    const address = await this.usersAddressesRepository.findAddressById(
      address_id
    );

    return address;
  }
}
