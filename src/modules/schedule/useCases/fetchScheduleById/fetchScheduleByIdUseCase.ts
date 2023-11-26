import { Schedule } from "@modules/schedule/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchScheduleByIdUseCase{
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository
  ){}

  async execute(scheduleId: string): Promise<Schedule>{
    const schedule = await this.schedulesRepository.findById(scheduleId);



    if(!schedule){
      throw new AppError('Agendamento não encontrado');
    }

    return schedule;
  }
}