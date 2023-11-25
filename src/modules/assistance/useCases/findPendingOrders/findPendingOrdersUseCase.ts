import { IAssistanceOrdersRepository } from "@modules/assistance/repositories/IAssistanceOrdersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindPendingOrdersUseCase{
  constructor(
    @inject('AssistanceOrdersRepository')
    private assistanceOrdersRepository: IAssistanceOrdersRepository
  ){}

  async execute(user_id: string){
    const orders = await this.assistanceOrdersRepository.isTherePendingOrders(user_id);
    return orders;
  }
}