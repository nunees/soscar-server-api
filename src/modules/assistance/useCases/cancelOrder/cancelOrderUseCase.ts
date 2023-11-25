import { IAssistanceOrdersRepository } from "@modules/assistance/repositories/IAssistanceOrdersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CancelOrderUseCase{
  constructor(
    @inject('AssistanceOrdersRepository')
    private assistanceOrdersRepository: IAssistanceOrdersRepository
  ){}

  async execute(order_id: string){
    await this.assistanceOrdersRepository.cancelOrder(order_id);
  }
}