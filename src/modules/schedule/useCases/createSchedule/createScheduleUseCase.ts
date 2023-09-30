import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { Schedule } from "@modules/schedule/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { getWeekDay } from "@utils/DateUtils";
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
    private vehiclesRepository: IVehiclesRepository,
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute({user_id, vehicle_id, location_id, service_type, date, time, notes}:IRequest): Promise<Schedule | null>{

    const user = await this.usersRepository.findById(user_id);
    if(!user){
      throw new Error("Usuario nao encontrado");
    }


    const vehicleExists = await this.vehiclesRepository.findById(vehicle_id);
    if(!vehicleExists){
      throw new AppError("Veiculo nao encontrado");
    }




    const location = await this.locationsRepository.findById(location_id);
    if(!location){
      throw new AppError("Local nao encontrado");
    }




    // Check if location is open on the selected day
    const weekDay = getWeekDay(date);
    const isOpen = location.open_hours_weekend?.includes(weekDay);
    if(!isOpen){
      throw new AppError("Local fechado no dia selecionado");
    }


    // Check if location is open on the selected time
    const openHours = location.open_hours!.split("-");
    const isLocationOpen = this.dateProvider.compareIfTimeIsOpen(time, openHours);
    if(!isLocationOpen){
      throw new AppError("Local fechado no horario selecionado");
    }


    // Check if time is available
    const newDate = date.toString().split("/");
    const tempDate = new Date(Number(newDate[2]), Number(newDate[1])-1, Number(newDate[0]));

    console.log("Date: ", tempDate)

    const allSchedulesByDate = await this.schedulesRepository.findByDate(
      new Date(tempDate)
    );

    console.log("All schedules by date: ", allSchedulesByDate)



    try{
      if(allSchedulesByDate?.length === 0){

        const schedule = await this.schedulesRepository.create({
          user_id,
          vehicle_id,
          location_id,
          service_type,
          date: new Date(Number(newDate[2]), Number(newDate[1])-1, Number(newDate[0])),
          time,
          notes
        });
        return schedule;
      }

      const isTimeAvailable = allSchedulesByDate?.find(schedule => schedule.time === time);

      if(!isTimeAvailable || isTimeAvailable === undefined){
        throw new AppError("Horario nao disponivel");
      }


      const schedule = await this.schedulesRepository.create({
        user_id,
        vehicle_id,
        location_id,
        service_type,
        date: new Date(Number(newDate[2]), Number(newDate[1])-1, Number(newDate[0])),
        time,
        notes
      });
      return schedule;
    }catch(error){

      throw new AppError("Erro ao criar agendamento");
    }
  }
}