import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id?: string;
  location_id?: string;
  cnpj: String;
  business_name: String;
  business_phone: String;
  business_email: String;
  business_expertise: Number[];
  address_line: String;
  number: Number;
  city: String;
  district: String;
  state: String;
  zipcode: String;
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
    business_expertise,
    address_line,
    number,
    city,
    district,
    state,
    zipcode,
  }: IRequest) {
    const userExists = await this.usersRepository.findById(String(user_id));

    if (!userExists) {
      throw new AppError("Usuário não encontrado");
    }

    const userLocation = await this.locationsRepository.findById(
      String(location_id)
    );

    await this.locationsRepository.update({
      location_id: String(location_id),
      cnpj,
      business_name,
      business_phone,
      business_email,
      business_expertise,
      address_line,
      number,
      city,
      district,
      state,
      zipcode,
    });
  }
}
