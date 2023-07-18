import { IUserAddressCreateDTO } from "../dtos/IUserAddressCreateDTO";
import { IUserAddressReturnDTO } from "../dtos/IUserAddressReturnDTO";

export interface IAddressRepository {
  create({
    user_id,
    address_line,
    number,
    district,
    city,
    state,
    zipcode,
  }: IUserAddressCreateDTO): Promise<void>;
  update(
    {
      user_id,
      address_line,
      number,
      district,
      city,
      state,
      zipcode,
    }: IUserAddressCreateDTO,
    id: string
  ): Promise<void>;
  deleteById(id: string): Promise<void>;
  findAddressById(address_id: string): Promise<IUserAddressReturnDTO>;
  findAllAddresses(user_id: string): Promise<IUserAddressReturnDTO[]>;
}
