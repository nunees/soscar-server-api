import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { message } from "@shared/lang/pt-br/String";
import { inject, injectable } from "tsyringe";

interface IRequest {
  cnpj: string;
  business_name: string;
  business_phone: string;
  business_email: string;
  business_expertise: number[];
  address_line: string;
  number: number;
  city: string;
  district: string;
  state: string;
  zipcode: string;
}

@injectable()
export class CreateLocationUseCase {
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    {
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
    }: IRequest,
    user_id: string
  ) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(message.UserNotFound, 404);
    }

    if (!user.isPartner) {
      throw new AppError(
        "Usuários comuns não podem criar endereços comerciais",
        401
      );
    }

    const addressExists = await this.locationsRepository.addressExists(
      address_line,
      number
    );

    if (addressExists) {
      throw new AppError("Endereço já cadastrado", 400);
    }

    await this.locationsRepository.create({
      user_id: String(user.id),
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
