import { ICreateAssistanceOrderDTO } from "@modules/assistance/dtos/ICreateAssistanceOrderDTO";
import { IAssistanceOrdersRepository } from "@modules/assistance/repositories/IAssistanceOrdersRepository";
import { AssistanceOrders } from "@prisma/client";
import { inject, injectable } from "tsyringe";



@injectable()
export class CreateAssistanceOrderUseCase{
  constructor(
    @inject("AssistanceOrdersRepository")
    private assistanceOrdersRepository: IAssistanceOrdersRepository
  ){}

  async execute({
    user_id,
    assistance_status_id,
    order_status,
    total_price,
    total_miles,
    latitude,
    longitude
  }: ICreateAssistanceOrderDTO): Promise<AssistanceOrders>{

    const order = await this.assistanceOrdersRepository.create({
      user_id,
      assistance_status_id,
      order_status,
      total_price,
      total_miles,
      latitude,
      longitude
    });

    return order;

  }
}