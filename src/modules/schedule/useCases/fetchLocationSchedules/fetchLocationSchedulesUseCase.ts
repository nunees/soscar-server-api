import { Schedule } from "@modules/schedule/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchLocationSchedulesUseCase{
    constructor(
        @inject("SchedulesRepository")
        private schedulesRepository: ISchedulesRepository
    ){}

    async execute(location_id: string): Promise<Schedule[]>{
        const schedules = await this.schedulesRepository.findLocationSchedules(location_id);

        return schedules;
    }
}