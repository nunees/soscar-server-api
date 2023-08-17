import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { message } from "@shared/lang/pt-br/String";
import { inject, injectable } from "tsyringe";

interface IRequest {
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
