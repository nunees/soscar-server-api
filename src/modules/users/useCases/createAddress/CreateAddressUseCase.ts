import { IUserAddressReturn } from "@modules/users/dtos/IUserAddressReturnDTO";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { inject, injectable } from "tsyringe";

export interface IRequest {
  id?: string;
  user_id: string;
  address_line: string;
  number: number;
  district: string;
  city: string;
  state: string;
  zipcode: string;
  created_at: Date;
  updated_at?: Date;
}

@injectable()
export class CreateAddressUseCase {
  constructor(
    @inject("AddressesRepositoryInMemory")
    private addressesRepositoryInMemory: IAddressRepository
  ) {}

  async execute({
    user_id,
    address_line,
    number,
    district,
    city,
    state,
    zipcode,
  }: IRequest): Promise<IUserAddressReturn> {
    const address = await this.addressesRepositoryInMemory.create({
      user_id,
      address_line,
      number,
      district,
      city,
      state,
      zipcode,
    });

    return address as IUserAddressReturn;
  }
}
