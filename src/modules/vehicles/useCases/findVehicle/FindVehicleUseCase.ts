import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IReturnVehicleDTO } from "@modules/vehicles/dtos/IReturnVehicleDTO";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FindVehicleUsecase{
  constructor(
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute(id: string): Promise<IReturnVehicleDTO>{
    const vehicle = await this.vehiclesRepository.findById(id);

    if(!vehicle){
      throw new Error("Veículo não existe!");
    }

    return vehicle;
  }

}