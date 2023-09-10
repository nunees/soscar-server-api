import { ICreateSchedule } from "@modules/schedule/dtos/ICreateSchedule";
import { Schedule } from "@modules/schedule/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateScheduleUseCase{
    constructor(
        @inject("SchedulesRepository")
        private schedulesRepository: ISchedulesRepository
    ){}

    async execute(id: string, schedule: ICreateSchedule): Promise<void>{
        const scheduleExists = await this.schedulesRepository.findById(id);

        if(!scheduleExists){
            throw new Error("Agendamento não encontrado!");
        }

        try{
            schedule.id = id;
            await this.schedulesRepository.update(schedule);
        }catch(error){
            throw new Error("Não foi possível atualizar o agendamento!");
        }
    }
}