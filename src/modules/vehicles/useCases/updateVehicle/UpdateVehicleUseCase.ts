import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { ICreateVehicleDTO } from "@modules/vehicles/dtos/ICreateVehicleDTO";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateVehicleUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ) {}

  async execute(vehicle_id: string, vehicle: ICreateVehicleDTO): Promise<void> {
    const userExists = await this.usersRepository.findById(vehicle.user_id);

    if (!userExists) {
      throw new Error("Usuario não existe!");
    }

    const vehicleExists = await this.vehiclesRepository.findById(vehicle_id);

    if (!vehicleExists) {
      throw new Error("Veiculo não existe!");
    }

    vehicleExists.brand_id = vehicle.brand_id || vehicleExists.brand_id;
    vehicleExists.name_id = vehicle.name_id || vehicleExists.name_id;
    vehicleExists.color = vehicle.color || vehicleExists.color;
    vehicleExists.plate = vehicle.plate || vehicleExists.plate;
    vehicleExists.year = vehicle.year || vehicleExists.year;
    vehicleExists.user_id = vehicle.user_id || vehicleExists.user_id;
    vehicleExists.engineMiles =
      Number(vehicle.engineMiles) || Number(vehicleExists.engineMiles);

    await this.vehiclesRepository.update(vehicleExists);
  }
}
