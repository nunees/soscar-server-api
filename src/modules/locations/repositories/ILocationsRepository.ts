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
    open_hours,
    open_hours_weekend,
  }: ICreateLocationDTO): Promise<ILocationDTO>;
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
  addressExists(address_line: string, number: number): Promise<boolean | null>;
  uploadPhotos( location_id: string, photo_file: string): Promise<void>;
  fetchPhotos(location_id: string, photo_file: string): Promise<string>;
  deletePhoto(photo_id: string): Promise<void>;
  findLocationByService(service_id: number): Promise<Location[] | null>;
  updateAvatar(location_id: string, avatar_file: string): Promise<void>;
  updateCoverImage(location_id: string, cover_image: string): Promise<void>;
  fetchAvatar(location_id: string, avatar_file: string): Promise<string>;
  fetchCoverImage(location_id: string, cover_image: string): Promise<string>;
}
