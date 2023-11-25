import { IAssistanceOrdersRepository } from "@modules/assistance/repositories/IAssistanceOrdersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class AcceptOrderUseCase{
  constructor(
    @inject('AssistanceOrdersRepository')
    private assistanceOrdersRepository: IAssistanceOrdersRepository
  ){}

  async execute(order_id: string){
    await this.assistanceOrdersRepository.acceptOrder(order_id);
  }
}