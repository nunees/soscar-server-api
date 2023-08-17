import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { ICreateVehicleDTO } from "@modules/vehicles/dtos/ICreateVehicleDTO";
import { IReturnVehicleDTO } from "@modules/vehicles/dtos/IReturnVehicleDTO";
import { Vehicle } from "@modules/vehicles/entities/Vehicle";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchAllUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ) {}

  async execute(user_id: string): Promise<IReturnVehicleDTO[]> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error("Usuario não existe!");
    }

    const vehicles = await this.vehiclesRepository.fetchAll(
      String(userExists.id)
    );

    return vehicles;
  }
}
