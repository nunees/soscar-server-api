import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchFilesUseCase{
    constructor(
        @inject("SchedulesRepository")
        private schedulesRepository: ISchedulesRepository
    ){}

    async execute(schedule_id: string, file_url: string){
        try{
            const files = await this.schedulesRepository.findFiles(schedule_id, file_url);
            return files;
        }catch(error){
            throw new Error("Nenhum arquivo encontrado!");
        }
    }
}