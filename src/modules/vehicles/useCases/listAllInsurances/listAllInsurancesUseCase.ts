import { IInsuranceDTO } from "@modules/vehicles/dtos/IInsuranceDTO";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllInsurancesUseCase{
  constructor(
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ){}

  async execute(): Promise<IInsuranceDTO[]> {
    const insurances = await this.vehiclesRepository.listAllInsurances();
    return insurances;
  }
}