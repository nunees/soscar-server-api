import { IUserAddressCreateDTO } from "@modules/users/dtos/IUserAddressCreateDTO";
import { Address } from "@modules/users/entities/Address";
import { v4 as uuid } from "uuid";
import { IAddressRepository } from "../IAddressRepository";

export class AddressesRepositoryInMemory implements IAddressRepository {
  addresses: Address[] = [];

  constructor() {
    this.addresses = [];
  }

  async create({
    user_id,
    address_line,
    number,
    district,
    city,
    state,
    zipcode,
  }: IUserAddressCreateDTO): Promise<IUserAddressCreateDTO> {
    const address = {
      id: uuid(),
      user_id,
      address_line,
      number,
      district,
      city,
      state,
      zipcode,
      created_at: new Date(),
    };

    this.addresses.push(address);

    return address;
  }
}
