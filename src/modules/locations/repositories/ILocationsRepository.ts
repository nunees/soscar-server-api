import { ICreateLocationDTO } from "../dtos/ICreateLocationDTO";
import { ILocationDTO } from "../dtos/ILocationDTO";
import { IUpdateLocationDTO } from "../dtos/IUpdateLocationDTO";
import { Location } from "../entities/Location";

export interface ILocationsRepository {
  create({
    user_id,
    cnpj,
    business_name,
    business_phone,
    business_email,
    address_line,
    number,
    city,
    district,
    state,
    zipcode,
    payment_methods,
    business_categories,
    business_description,
  }: ICreateLocationDTO): Promise<void>;
  delete(location_id: string): Promise<void>;
  update(
    {
      business_name,
      business_phone,
      business_email,
      address_line,
      number,
      city,
      district,
      state,
      zipcode,
      payment_methods,
      business_categories,
      business_description,
    }: IUpdateLocationDTO,
    location_id: string
  ): Promise<void>;
  findById(location_id: string): Promise<ILocationDTO>;
  findAll(user_id: string): Promise<ILocationDTO[]>;
  addressExists(address_line: string, number: number): Promise<ILocationDTO>;
}
