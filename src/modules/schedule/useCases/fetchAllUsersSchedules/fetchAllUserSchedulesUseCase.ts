import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FetchAllUserSchedulesUseCase{
    constructor(
        @inject("SchedulesRepository")
        private schedulesRepository: ISchedulesRepository,
    ){}

    async execute(user_id: string, location_id: string){
        const schedules = await this.schedulesRepository.findAllUsersSchedules(user_id, location_id);

        if(!schedules){
            throw new Error("Nenhum agendamento realizado");
        }

        console.log(schedules);

        return schedules;
    }
}