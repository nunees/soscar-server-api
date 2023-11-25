import { IAssistanceStatusRepository } from "@modules/assistance/repositories/IAssistanceStatusRepository";
import { inject, injectable } from "tsyringe";

type Request = {
  user_id: string;
  service_id: number;
  milesFee: number;
  price: number;
}

@injectable()
export class CreateAssistanceStatusUseCase{
  constructor(
    @inject('AssistanceStatusRepository')
    private assistanceStatusRepository: IAssistanceStatusRepository
  ){}

  async execute({user_id, service_id, milesFee, price}: Request): Promise<void>{
    //check if user is already working on a service
    const isAssistanceWorking = await this.assistanceStatusRepository.findByUserId(user_id);

    if(isAssistanceWorking){
      throw new Error("Você já está trabalhando em um serviço");
    }

    await this.assistanceStatusRepository.create({
      user_id,
      service_id,
      milesFee,
      price
    })
  }
}