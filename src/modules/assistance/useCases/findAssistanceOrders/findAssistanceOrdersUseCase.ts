import { AssistanceOrders } from "@modules/assistance/entities/AssistaceOrders";
import { IAssistanceOrdersRepository } from "@modules/assistance/repositories/IAssistanceOrdersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAssistanceOrdersUseCase{
  constructor(
    @inject("AssistanceOrdersRepository")
    private assistanceOrdersRepository: IAssistanceOrdersRepository
  ){}

  async execute(user_id: string, assistance_status_id: string): Promise<AssistanceOrders | null>{
    const orders = await this.assistanceOrdersRepository.find(user_id, assistance_status_id );

    if(!orders){
      return null;
    }

    return orders as AssistanceOrders;
  }
}