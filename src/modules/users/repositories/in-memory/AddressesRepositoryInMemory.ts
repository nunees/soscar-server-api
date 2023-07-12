import { IUserAddressCreateDTO } from "@modules/users/dtos/IUserAddressCreateDTO";
import { IUserAddressReturnDTO } from "@modules/users/dtos/IUserAddressReturnDTO";
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
  }: IUserAddressCreateDTO): Promise<void> {
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
  }

  async update({
    address_line,
    number,
    district,
    city,
    state,
    zipcode,
  }: IUserAddressCreateDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getAddressById(id: string): Promise<IUserAddressReturnDTO> {
    throw new Error("Method not implemented.");
  }
  getAllUserAddress(user_id: string): Promise<IUserAddressReturnDTO[]> {
    throw new Error("Method not implemented.");
  }
}
