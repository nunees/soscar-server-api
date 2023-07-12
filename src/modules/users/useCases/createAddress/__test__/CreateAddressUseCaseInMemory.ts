import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
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
export class CreateAddressUseCaseInMemory {
  constructor(
    @inject("UsersRepositoryInMemory")
    private usersRepositoryInMemory: IUsersRepository,
    @inject("AddressesRepositoryInMemory")
    private addressesRepositoryInMemory: IAddressRepository
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
    try {
      if (
        !user_id ||
        !address_line ||
        !number ||
        !district ||
        !city ||
        !state ||
        !zipcode
      ) {
        throw new AppError("Todos os campos sao obrigatorios");
      }

      const userExists = await this.usersRepositoryInMemory.isUserPartner(
        user_id,
        false
      );

      if (userExists) {
        throw new AppError(
          "Nao e possivel criar um endereco para este usuario"
        );
      }

      await this.addressesRepositoryInMemory.create({
        user_id,
        address_line,
        number,
        district,
        city,
        state,
        zipcode,
        created_at: new Date(),
      });
    } catch (error) {
      throw new AppError("Erro ao criar um novo endereco");
    }
  }
}
