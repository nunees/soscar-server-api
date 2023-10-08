import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id?: string;
  location_id?: string;
  cnpj: string;
  business_name: string;
  business_phone: string;
  business_email: string;
  address_line: string;
  number: number;
  city: string;
  district: string;
  state: string;
  zipcode: string;
  payment_methods: number[],
  business_categories: number[],
  business_description: string | null,
  open_hours: string,
  open_hours_weekend: string[],
  latitude: string,
  longitude: string,
}

@injectable()
export class UpdateLocationUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ) {}

  async execute({
    user_id,
    location_id,
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
    latitude,
    longitude
  }: IRequest) {
    const userExists = await this.usersRepository.findById(String(user_id));

    if (!userExists) {
      throw new AppError("Usuário não encontrado");
    }

    const userLocation = await this.locationsRepository.findById(
      String(location_id)
    );

    await this.locationsRepository.update(
      {
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
        latitude,
        longitude
      },
      String(location_id)
    );
  }
}
