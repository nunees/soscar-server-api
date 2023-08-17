import { IListAllBrands } from "@modules/vehicles/dtos/IListAllBrands";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllBrandsUseCase {
  constructor(
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ) {}

  async execute(): Promise<IListAllBrands[]> {
    const brands = await this.vehiclesRepository.listAllBrands();
    return brands;
  }
}
