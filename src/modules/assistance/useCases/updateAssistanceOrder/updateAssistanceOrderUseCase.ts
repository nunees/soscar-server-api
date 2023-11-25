import { IUpdateAssistanceOrderDTO } from "@modules/assistance/dtos/IUpdateAssistanceOrderDTO";
import { IAssistanceOrdersRepository } from "@modules/assistance/repositories/IAssistanceOrdersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateAssistanceOrderUseCase{
  constructor(
    @inject("AssistanceOrdersRepository")
    private assistanceOrdersRepository: IAssistanceOrdersRepository
  ){}

  async execute({
    order_id,
    order_status,
    total_price,
    total_miles
  }: IUpdateAssistanceOrderDTO, user_id: string): Promise<void>{
    await this.assistanceOrdersRepository.update({
      order_id,
      order_status,
      total_price,
      total_miles
    }, user_id);
  }
}