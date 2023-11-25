import { IAssistanceStatusRepository } from "@modules/assistance/repositories/IAssistanceStatusRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateLocationUseCase{
  constructor(
    @inject("AssistanceStatusRepository")
    private assistanceStatusRepository: IAssistanceStatusRepository
  ){}

  async execute(busy: boolean, latitude: string, longitude: string, user_id: string, status: number){
    await this.assistanceStatusRepository.updateLocation(busy, latitude, longitude, user_id, status);
  }
}