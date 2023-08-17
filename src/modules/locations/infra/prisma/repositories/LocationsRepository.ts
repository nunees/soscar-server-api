import { ICreateLocationDTO } from "@modules/locations/dtos/ICreateLocationDTO";
import { ILocationDTO } from "@modules/locations/dtos/ILocationDTO";
import { IUpdateLocationDTO } from "@modules/locations/dtos/IUpdateLocationDTO";
import { Location } from "@modules/locations/entities/Location";
import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class LocationsRepository implements ILocationsRepository {
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ) {}

  async create({
    user_id,
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
  }: ICreateLocationDTO): Promise<void> {
    await this.prismaClient.businessLocations.create({
      data: {
        user_id: String(user_id),
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
      },
    });
  }

  async delete(location_id: string): Promise<void> {
    try {
      await this.prismaClient.businessLocations.delete({
        where: {
          id: location_id,
        },
      });
    } catch (error) {
      throw new AppError(error);
    }
  }
  async update(
    {
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
    }: IUpdateLocationDTO,
    location_id: string
  ): Promise<void> {
    try {
      await this.prismaClient.businessLocations.update({
        where: {
          id: location_id,
        },
        data: {
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
        },
      });
    } catch (error) {
      throw new AppError(error);
    }
  }
  async findById(location_id: string): Promise<ILocationDTO> {
    try {
      const location = await this.prismaClient.businessLocations.findUnique({
        where: {
          id: location_id,
        },
      });

      return location as ILocationDTO;
    } catch (error) {
      throw new AppError(error);
    }
  }

  async findAll(user_id: string): Promise<ILocationDTO[]> {
    try {
      const locations = await this.prismaClient.businessLocations.findMany({
        where: {
          user_id,
        },
        orderBy: {
          created_at: "asc",
        },
      });

      return locations;
    } catch (error) {
      throw new AppError(error);
    }
  }

  async addressExists(
    address_line: string,
    number: number
  ): Promise<ILocationDTO> {
    try {
      const location = await this.prismaClient.businessLocations.findFirst({
        where: {
          address_line,
          number,
        },
      });

      return location as ILocationDTO;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
