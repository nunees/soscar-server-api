import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";

type IRequest = {
  user_id: string;
  vehicle_id: string;
  location_id: string;
  service_type: number;
  date: Date;
  time: string;
  notes: string;
}

@injectable()
export class CreateScheduleUseCase{
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ){}

  async execute({user_id, vehicle_id, location_id, service_type, date, time, notes}:IRequest): Promise<void>{
    const user = await this.usersRepository.findById(user_id);
    if(!user){
      throw new Error("Usuario nao encontrado");
    }

    const vehicleExists = await this.vehiclesRepository.findById(vehicle_id);
    if(!vehicleExists){
      throw new Error("Veiculo nao encontrado");
    }

    await this.schedulesRepository.create({
      user_id,
      vehicle_id,
      location_id,
      service_type,
      date,
      time,
      notes
    });
  }
}