import { IAssistanceOrdersRepository } from "@modules/assistance/repositories/IAssistanceOrdersRepository";
import { AssistanceOrders } from "@prisma/client";
import { inject, injectable } from "tsyringe";


@injectable()
export class FindAssistanceOrderByIdUseCase{
  constructor(
    @inject("AssistanceOrdersRepository")
    private assistanceOrdersRepository: IAssistanceOrdersRepository
  ){}

  async execute(order_id: string): Promise<AssistanceOrders>{
    const order = await this.assistanceOrdersRepository.findById(order_id);

    return order;
  }
}