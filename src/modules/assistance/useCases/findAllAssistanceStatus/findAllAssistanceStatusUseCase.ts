import { IAssistanceStatusRepository } from "@modules/assistance/repositories/IAssistanceStatusRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllAssistanceStatusUseCase{
  constructor(
    @inject("AssistanceStatusRepository")
    private assistanceStatusRepository: IAssistanceStatusRepository
  ){}

  async execute(user_id: string){
    const status = await this.assistanceStatusRepository.find(user_id);

    return status;
  }
}