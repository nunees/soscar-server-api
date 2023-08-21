import { IListAllVehiclesNamesDTO } from "@modules/vehicles/dtos/IListAllVehiclesNamesDTO";
import { IReturnVehicleDTO } from "@modules/vehicles/dtos/IReturnVehicleDTO";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindModelNameByIdUseCase{
  constructor(
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ){}

  async execute(brand_id: number): Promise<IListAllVehiclesNamesDTO[]>{
    const vehicle = await this.vehiclesRepository.findModelNameById(brand_id);

    if(!vehicle){
      throw new Error("Veículo não existe!");
    }

    return vehicle;
  }

}