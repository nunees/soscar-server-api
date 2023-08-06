import { IUserAddressCreateDTO } from "@modules/users/dtos/IUserAddressCreateDTO";
import { IUserAddressReturnDTO } from "@modules/users/dtos/IUserAddressReturnDTO";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { message } from "@shared/lang/pt-br/String";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddressesRepository implements IAddressRepository {
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ) {}

  async create({
    user_id,
    address_line,
    number,
    district,
    city,
    state,
    zipcode,
  }: IUserAddressCreateDTO): Promise<void> {
    const userExists = await this.prismaClient.users.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!userExists) {
      throw new AppError(message.UserNotFound, 401);
    }

    await this.prismaClient.usersAddresses.create({
      data: {
        user_id: userExists.id,
        address_line,
        number,
        district,
        city,
        state,
        zipcode,
      },
    });
  }

  async update(
    {
      user_id,
      address_line,
      number,
      district,
      city,
      state,
      zipcode,
    }: IUserAddressCreateDTO,
    id: string
  ): Promise<void> {
    await this.prismaClient.usersAddresses.update({
      data: {
        address_line,
        number,
        district,
        city,
        state,
        zipcode,
      },
      where: {
        id,
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaClient.usersAddresses.delete({
      where: {
        id,
      },
    });
  }

  async getAddressById(id: string): Promise<IUserAddressReturnDTO> {
    const addresses = await this.prismaClient.usersAddresses.findUnique({
      where: {
        id,
      },
    });
    return addresses as IUserAddressReturnDTO;
  }

  async findAllAddresses(user_id: string): Promise<IUserAddressReturnDTO[]> {
    const addresses = await this.prismaClient.usersAddresses.findMany({
      where: {
        user_id,
      },
      orderBy: {
        state: "asc",
      },
    });

    return addresses as IUserAddressReturnDTO[];
  }

  async findAddressById(address_id: string): Promise<IUserAddressReturnDTO> {
    const address = await this.prismaClient.usersAddresses.findUnique({
      where: {
        id: address_id,
      },
    });
    return address as IUserAddressReturnDTO;
  }
}
