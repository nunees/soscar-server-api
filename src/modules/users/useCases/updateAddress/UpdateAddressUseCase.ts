import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { message } from "@shared/lang/pt-br/String";
import { container, inject, injectable } from "tsyringe";

type IRequest = {
  user_id: string;
  address_id: string;
  address_line: string;
  number: number;
  district: string;
  city: string;
  state: string;
  zipcode: string;
};

@injectable()
export class UpdateAddressUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("AddressesRepository")
    private addressesRepository: IAddressRepository
  ) {}

  async execute({
    user_id,
    address_id,
    address_line,
    number,
    district,
    city,
    state,
    zipcode,
  }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error(message.UserNotFound);
    }

    const addressExists = await this.addressesRepository.findAddressById(
      address_id,
      user_id
    );

    if (!addressExists) {
      throw new Error(message.AddressNotFound);
    }

    await this.addressesRepository.update(
      {
        address_line,
        number,
        district,
        city,
        state,
        zipcode,
      },
      address_id
    );
  }
}
