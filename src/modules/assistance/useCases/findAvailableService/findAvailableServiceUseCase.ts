import { IAssistanceStatusRepository } from "@modules/assistance/repositories/IAssistanceStatusRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FindAvailableServiceUseCase{
  constructor(
    @inject('AssistanceStatusRepository')
    private assistanceStatusRepository: IAssistanceStatusRepository
  ){}

  async handle(service_id: number){
    const result = await this.assistanceStatusRepository.findAvailablePartners(service_id);

    return result;
  }
}