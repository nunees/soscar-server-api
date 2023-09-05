import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { inject, injectable } from "tsyringe";

type IRequest = {
  id: string;
  file: string | undefined;
}

@injectable()
export class UploadDocumentsUseCase{
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ){}

  async execute({id, file}: IRequest): Promise<void>{

  }
}