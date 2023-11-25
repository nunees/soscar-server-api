import { AssistanceOrders } from "@prisma/client";
import { ICreateAssistanceOrderDTO } from "../dtos/ICreateAssistanceOrderDTO";
import { IUpdateAssistanceOrderDTO } from "../dtos/IUpdateAssistanceOrderDTO";

export interface IAssistanceOrdersRepository{
  create(data: ICreateAssistanceOrderDTO): Promise<AssistanceOrders>;
  update(data: IUpdateAssistanceOrderDTO, user_id: string): Promise<void>;
  findById(order_id: string): Promise<AssistanceOrders>;
  find(user_id: string, assistance_status_id: string): Promise<AssistanceOrders | null>;
  isTherePendingOrders(user_id: string): Promise<boolean>;
  cancelOrder(order_id: string): Promise<void>;
  acceptOrder(order_id: string): Promise<void>;
}