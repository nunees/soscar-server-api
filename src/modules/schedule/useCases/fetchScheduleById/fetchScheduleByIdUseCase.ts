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

  async execute(id: string): Promise<Schedule>{
    const schedule = await this.schedulesRepository.findById(id);

    if(!schedule){
      throw new AppError('Agendamento nao encontrado');
    }

    return schedule;
  }
}