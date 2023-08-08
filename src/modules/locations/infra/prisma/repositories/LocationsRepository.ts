import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

type IRequest = {
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
}
