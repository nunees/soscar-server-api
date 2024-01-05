import { IUserAddressCreateDTO } from "@modules/users/dtos/IUserAddressCreateDTO";
import { IUserAddressReturnDTO } from "@modules/users/dtos/IUserAddressReturnDTO";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@errors/AppError";
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
      throw new AppError("Usuário não encontrado");
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
      address_line,
      number,
      district,
      city,
      state,
      zipcode,
    }: IUserAddressCreateDTO,
    address_id: string
  ): Promise<void> {
    try {
      await this.prismaClient.usersAddresses.update({
        data: {
          address_line,
          number,
          district,
          city,
          state,
          zipcode,
          updated_at: new Date(),
        },
        where: {
          id: address_id,
        },
      });
    } catch (error) {
      throw new AppError("Erro ao atualizar endereço");
    }
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

  async findAddressById(
    address_id: string,
    user_id: string
  ): Promise<IUserAddressReturnDTO> {
    try {
      const address = await this.prismaClient.usersAddresses.findFirst({
        where: {
          id: address_id,
          AND: {
            user_id,
          },
        },
      });
      return address as IUserAddressReturnDTO;
    } catch (error) {
      throw new AppError("Endereço não encontrado");
    }
  }
}
