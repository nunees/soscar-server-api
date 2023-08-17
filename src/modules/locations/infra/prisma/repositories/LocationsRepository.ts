import { ICreateLocationDTO } from "@modules/locations/dtos/ICreateLocationDTO";
import { Location } from "@modules/locations/entities/Location";
import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

type IRequest = {
  location_id?: string;
  user_id: string;
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
};

type IResponse = IRequest;

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
  }: IRequest): Promise<void> {
    await this.prismaClient.businessLocations.create({
      data: {
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
      },
    });
  }

<<<<<<< Updated upstream
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
  async update({
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
  }: IRequest): Promise<void> {
    try {
      await this.prismaClient.businessLocations.update({
        where: {
          id: location_id,
        },
        data: {
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
    } catch (error) {
      throw new AppError(error);
    }
  }
  async findById(location_id: string): Promise<Location> {
    try {
      const location = await this.prismaClient.businessLocations.findUnique({
        where: {
          id: location_id,
        },
      });
      return location as ILocationsRepository;
    } catch (error) {
      throw new AppError(error);
    }
  }

  async findAll(location_id: string): Promise<ILocationsRepository[]> {
    const locations = await this.prismaClient.businessLocations.findMany({
      where: {
        user_id: location_id,
      },
    });

    return locations as unknown as Location[];
=======
  async findAll(user_id: string): Promise<IResponse[]> {
    try {
      const locations = await this.prismaClient.businessLocations.findMany({
        where: {
          user_id,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      console.log(locations);
      return locations;
    } catch (error) {
      throw new AppError("Erro ao buscar endereços comerciais", 500);
    }
>>>>>>> Stashed changes
  }
}
