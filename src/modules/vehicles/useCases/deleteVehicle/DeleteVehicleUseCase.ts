import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteVehicleUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ) {}

  async execute(user_id: string, vehicle_id: string): Promise<void> {
    const userExists = this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error("Usuario não existe!");
    }

    await this.vehiclesRepository.delete(vehicle_id);
  }
}
