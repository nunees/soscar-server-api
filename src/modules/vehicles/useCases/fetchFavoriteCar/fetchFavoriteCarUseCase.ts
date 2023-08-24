import { IReturnVehicleDTO } from "@modules/vehicles/dtos/IReturnVehicleDTO";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FetchFavoriteCarUseCase{
  constructor(
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ){}

  async execute(user_id: string): Promise<IReturnVehicleDTO[]>{
    const vehicles = await this.vehiclesRepository.findFavoriteCar(user_id);
    return vehicles;
  }
}