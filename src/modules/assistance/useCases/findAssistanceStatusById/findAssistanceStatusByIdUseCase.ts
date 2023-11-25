import { AssistanceStatus } from "@modules/assistance/entities/AssistanceStatus";
import { IAssistanceStatusRepository } from "@modules/assistance/repositories/IAssistanceStatusRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FindAssistanceStatusByIdUseCase{
  constructor(
    @inject("AssistanceStatusRepository")
    private assistanceStatusRepository: IAssistanceStatusRepository
  ){}

  async execute(id: string): Promise<AssistanceStatus>{
    const status = await this.assistanceStatusRepository.findById(id);
    if(!status){
      throw new Error("Status not found");
    }
    return status;
  }
}