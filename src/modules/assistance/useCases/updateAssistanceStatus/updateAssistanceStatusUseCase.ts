import { IUpdateAssistanceStatusDTO } from "@modules/assistance/dtos/IUpdateAssistanceStatusDTO";
import { IAssistanceStatusRepository } from "@modules/assistance/repositories/IAssistanceStatusRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateAssistanceStatusUseCase{
  constructor(
    @inject("AssistanceStatusRepository")
    private assistanceStatusRepository: IAssistanceStatusRepository
  ){}

  async execute(data: IUpdateAssistanceStatusDTO): Promise<void>{

    await this.assistanceStatusRepository.update(data);
  }
}