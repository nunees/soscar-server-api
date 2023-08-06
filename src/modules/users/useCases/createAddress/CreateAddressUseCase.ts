import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

export interface IRequest {
  user_id: string;
  address_line: string;
  number: number;
  district: string;
  city: string;
  state: string;
  zipcode: string;
}

@injectable()
export class CreateAddressUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("AddressesRepository")
    private addressesRepository: IAddressRepository,
    @inject("DayJsDateProvider")
    private dayJsDateProvider: IDateProvider // @inject("AddressesRepositoryInMemory") // private addressesRepositoryInMemory: IAddressRepository
  ) {}

  async execute({
    user_id,
    address_line,
    number,
    district,
    city,
    state,
    zipcode,
  }: IRequest): Promise<void> {
    const userExists = await this.usersRepository?.findById(user_id);

    if (userExists === null || userExists === undefined) {
      throw new AppError("Usuario nao existe");
    }

    try {
      await this.addressesRepository.create({
        user_id,
        address_line,
        number,
        district,
        city,
        state,
        zipcode,
        created_at: this.dayJsDateProvider.datenow(),
      });
    } catch (error) {
      throw new AppError("Erro ao criar endereco");
    }
  }
}
