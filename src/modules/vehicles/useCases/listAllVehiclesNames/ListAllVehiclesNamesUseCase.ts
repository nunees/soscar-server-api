import { IListAllVehiclesNamesDTO } from "@modules/vehicles/dtos/IListAllVehiclesNamesDTO";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllVehiclesNamesUseCase {
  constructor(
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ) {}

  async execute(): Promise<IListAllVehiclesNamesDTO[]> {
    const vehicles = await this.vehiclesRepository.listAllVehiclesNames();
    return vehicles;
  }
}
