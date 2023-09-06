import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class UploadDocumentsUseCase{
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ){}

  async execute(id: string, schedule_id: string, file: string): Promise<void>{
    const schedule = await this.schedulesRepository.findById(schedule_id);

    if(!schedule){
      throw new Error("Agendamento não encontrado");
    }

    if(schedule.user_id !== id){
      throw new Error("Usuario nao autorizado");
    }

    const uploadDocument = await this.schedulesRepository.uploadDocument(schedule.id as string, file);

  }
}