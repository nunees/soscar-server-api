import { Schedule } from "@modules/schedule/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FetchSchedulesUseCase{
    constructor(
        @inject("SchedulesRepository")
        private schedulesRepository: ISchedulesRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ){}

    async execute(user_id: string): Promise<Schedule[] | null>{
        const user = await this.usersRepository.findById(user_id);
        if(!user){
            throw new Error("Usuario nao encontrado");
        }

        const schedules = await this.schedulesRepository.findAll(user_id);
        if(!schedules){
            throw new Error("Nenhum agendamento realizado");
        }

        return schedules;
    }
}