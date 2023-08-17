import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

type IRequest = {
  user_id;
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
};

type IResponse = IRequest;

@injectable()
export class FindAllUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ) {}

  async execute(partner_id: string): Promise<IResponse[]> {
    const partner = await this.usersRepository.findById(partner_id);

    if (!partner || !partner.isPartner) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const locations = await this.locationsRepository.findAll(partner_id);

    return locations;
  }
}
