import { ICreateVehicleDTO } from "@modules/vehicles/dtos/ICreateVehicleDTO";
import { IInsuranceDTO } from "@modules/vehicles/dtos/IInsuranceDTO";
import { IListAllBrands } from "@modules/vehicles/dtos/IListAllBrands";
import { IListAllVehiclesNamesDTO } from "@modules/vehicles/dtos/IListAllVehiclesNamesDTO";
import { IReturnVehicleDTO } from "@modules/vehicles/dtos/IReturnVehicleDTO";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class VehiclesRepository implements IVehiclesRepository {
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ) {}

  async create({
    user_id,
    brand_id,
    name_id,
    color,
    year,
    plate,
    insurance_id,
    notes,
    isPrimary,
  }: ICreateVehicleDTO): Promise<void> {
   try{
    await this.prismaClient.usersVehicles.create({
      data: {
        user_id,
        brand_id,
        name_id,
        color,
        year,
        plate,
        notes,
        insuranceCompaniesId: insurance_id,
        isPrimary,
      }
    });
   }catch(error){
    throw new AppError("Erro ao cadastrar veículo");
   }
  }

  async fetchAll(user_id: string): Promise<IReturnVehicleDTO[]> {
    try {
      const vehicles = await this.prismaClient.usersVehicles.findMany({
        where: {
          user_id,
        },
        include: {
          brand: {
            select: {
              icon: true,
              name: true,
              id: true,
            }
          },
          name: {
            select: {

              name: true,
              id: true,
            }
          },
        },
      });

      return vehicles as IReturnVehicleDTO[];
    } catch (error) {
      throw new AppError("Erro ao buscar veículos");
    }
  }

  async delete(vehicle_id: string): Promise<void> {
    try {
      await this.prismaClient.usersVehicles.delete({
        where: {
          id: vehicle_id,
        },
      });
    } catch (error) {
      throw new AppError("Erro ao deletar veículo");
    }
  }

  async update(vehicle: ICreateVehicleDTO): Promise<void> {
    try {
      await this.prismaClient.usersVehicles.update({
        where: {
          id: String(vehicle.id),
        },
        data: {
          brand_id: vehicle.brand_id,
          name_id: vehicle.name_id,
          color: vehicle.color,
          year: vehicle.year,
          plate: vehicle.plate || null,
          engineMiles: Number(vehicle.engineMiles),
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw new AppError("Erro ao atualizar veículo");
    }
  }

  async findById(vehicle_id: string): Promise<IReturnVehicleDTO> {
      const vehicle = await this.prismaClient.usersVehicles.findUnique({
        where: {
          id: vehicle_id,
        },
        include: {
          brand: true,
          name: true,
          InsuranceCompanies: true,
        },
      });

      return vehicle as IReturnVehicleDTO;
  }

  async listAllBrands(): Promise<IListAllBrands[]> {
    try {
      const brands = await this.prismaClient.vehiclesBrands.findMany();
      return brands;
    } catch (error) {
      throw new AppError("Erro ao buscar marcas de veículos");
    }
  }

  async listAllVehiclesNames(): Promise<IListAllVehiclesNamesDTO[]> {
    try {
      const vehiclesNames = await this.prismaClient.vehiclesNames.findMany();
      return vehiclesNames;
    } catch (error) {
      throw new AppError("Não há veículos cadastrados!");
    }
  }

  async findModelNameById(brand_id: number): Promise<IListAllVehiclesNamesDTO[]> {
    try{
      const models = await this.prismaClient.vehiclesNames.findMany({
        where: {
          brand_id,
        }
      })

      return models;
    }catch(error){
      throw new AppError("Não há veículos cadastrados!");
    }
  }

  async listAllInsurances(): Promise<IInsuranceDTO[]> {
    const insurances = await this.prismaClient.insuranceCompanies.findMany();
    return insurances;
  }

  async findFavoriteCar(user_id: string): Promise<IReturnVehicleDTO[]> {
    const vehicles = await this.prismaClient.usersVehicles.findMany({
      where: {
        user_id,
        AND: {
          isPrimary: true,
        },

      },
      include: {
        brand: true,
      }
    })

    return vehicles as IReturnVehicleDTO[];
  }



}
