import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteAddressUseCase {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressRepository
  ) {}

  async execute(address_id: string): Promise<void> {
    await this.addressesRepository.deleteById(address_id);
  }
}
