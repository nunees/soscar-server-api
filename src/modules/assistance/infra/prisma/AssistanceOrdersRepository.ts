import { ICreateAssistanceOrderDTO } from "@modules/assistance/dtos/ICreateAssistanceOrderDTO";
import { IUpdateAssistanceOrderDTO } from "@modules/assistance/dtos/IUpdateAssistanceOrderDTO";
import { IAssistanceOrdersRepository } from "@modules/assistance/repositories/IAssistanceOrdersRepository";
import { AssistanceOrders, PrismaClient } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { AppError } from "@errors/AppError";
import { injectable, inject } from "tsyringe";

@injectable()
export class AssistanceOrdersRepository implements IAssistanceOrdersRepository{
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient
  ){}

  async acceptOrder(order_id: string): Promise<void> {
    try{
      await this.prisma.assistanceOrders.update({
        where: {
          id: order_id
        },
        data: {
          order_status: 2
        }
      });
    }catch(error){
      throw new AppError("Erro ao aceitar ordem de assistência")
    }
  }

  async cancelOrder(order_id: string): Promise<void> {
    try{
      await this.prisma.assistanceOrders.update({
        where: {
          id: order_id
        },
        data: {
          order_status: 4
        }
      });
    }catch(error){
      throw new AppError("Erro ao cancelar ordem de assistência")
    }
  }

  async isTherePendingOrders(user_id: string): Promise<boolean> {
    try {
      const userAlreadyHasOrder = await this.prisma.assistanceOrders.findFirst({
        where: {
          user_id,
          AND: {
            order_status : {
              not: 3 || 4
            }
          }
        }
      })

      if(userAlreadyHasOrder){
        return true;
      }

      return false;

    } catch (error) {
      throw new AppError("Erro ao verificar se usuário já possui ordem de assistência")
    }
  }


  async find(user_id: string, assistance_status_id: string): Promise<AssistanceOrders | null> {
    try {

      const orders = await this.prisma.assistanceOrders.findFirst({
        where: {
          assistance_status_id,
          AND: {
            order_status : {
              not: 3 || 4
            }
          },
        },include: {
          assistance_status: true,
          Users: true
        }



      });

      if(!orders){
        return null;
      }

      return orders;

    } catch (error) {

      throw new AppError("Erro ao buscar ordens de assistência")
    }
  }



  async findById(order_id: string): Promise<AssistanceOrders> {
    try {
      const result = await this.prisma.assistanceOrders.findFirst({
        where: {
          id: order_id
        }
      });

     if(!result){
       throw new AppError("Ordem de assistência não encontrada")
     }

     return result;

    } catch (error) {
      throw new AppError("Erro ao encontrar ordem de assistência")
    }
  }

  async update(data: IUpdateAssistanceOrderDTO, user_id: string): Promise<void> {

    try {
      const order = await this.prisma.assistanceOrders.findFirst({
        where: {
          id: data.order_id
        }
      });

      if(!order){
        throw new AppError("Ordem não encontrada")
      }

      order.latitude = data.latitude ?? order.latitude;
      order.longitude = data.longitude ?? order.longitude;
      order.total_price = data.total_price ?? order.total_price;
      order.total_miles = data.total_miles ?? order.total_miles;
      order.order_status = data.order_status ?? order.order_status;
      order.updated_at = new Date();

      await this.prisma.assistanceOrders.update({
        where: {
          id: data.order_id
        },
        data: {
          ...order
        }
      });

    } catch (error) {
      throw new AppError("Erro ao atualizar ordem de assistência")
    }
  }

  async create({ user_id,
    assistance_status_id,
    order_status,
    total_price,
    total_miles,
  latitude, longitude}: ICreateAssistanceOrderDTO): Promise<AssistanceOrders> {
      const order = await this.prisma.assistanceOrders.create({
        data: {
          user_id,
          assistance_status_id,
          order_status,
          total_price,
          total_miles,
          latitude,
          longitude,
        }
      });

      return order;
  }

}