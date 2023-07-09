import { IUserAddressCreateDTO } from "../dtos/IUserAddressCreateDTO";

export interface IAddressRepository {
  create({
    user_id,
    address_line,
    number,
    district,
    city,
    state,
    zipcode,
  }: IUserAddressCreateDTO): Promise<IUserAddressCreateDTO>;
}
