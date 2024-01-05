import { ICreateNotificationDTO } from "@modules/notifications/dtos/ICreateNotificationDTO";
import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@errors/AppError";
import { inject, injectable } from "tsyringe";
import { Notification } from "@modules/notifications/entities/Notification";

@injectable()
export class NotificationsRepository implements INotificationsRepository{
  constructor(
    @inject('PrismaClient')
    private prismaClient: PrismaClient
  ){}

  async findNotRead(user_id: string): Promise<Notification[]> {
    try{
      const notifications = await this.prismaClient.notifications.findMany({
        orderBy: {
          created_at: 'desc'
        },
        where: {
          user_id,
          AND: {
            received: false,
          }
        }
      });

      return notifications as Notification[];
    }catch(error){
      throw new AppError("Notificações não encontradas!");
    }
  }

  async findAll(user_id: string): Promise<Notification[]> {
    try {
      const notifications = await this.prismaClient.notifications.findMany({
        orderBy: {
          created_at: 'desc'
        },
        where: {
          user_id,
          AND: {
            received: false,
          }
        }
      });

      return notifications || [] as Notification[];
    } catch (error) {
      throw new AppError("Notificações não encontradas!");
    }
  }

  async deleteAllNotifications(user_id: string): Promise<void> {
    try {
      await this.prismaClient.notifications.deleteMany({
        where: {
          user_id,
        }
      });
    } catch (error) {
      throw new AppError("Erro ao deletar notificações!");
    }
  }

  async create({ user_id, title, body, channel }: ICreateNotificationDTO): Promise<void> {
    try{
      await this.prismaClient.notifications.create({
        data: {
          user_id,
          title,
          body,
          channel,
          created_at: new Date(),
        }
      });
    }catch(error){
      throw new AppError("Erro ao criar notificação!");
    }
  }


  async findByUserId(user_id: string): Promise<Notification[]> {
    try {
      const notifications = await this.prismaClient.notifications.findMany({
        where: {
          user_id,
        },
        orderBy: {
          created_at: 'desc'
        }
      });


      return notifications || [] as Notification[];
    } catch (error) {
      throw new AppError("Notificações não encontradas!");
    }
  }


  async findById(id: string): Promise<Notification> {
    try {
      const notification = await this.prismaClient.notifications.findFirst({
        where: {
          id,
        }
      });

      return notification || {} as Notification;
    } catch (error) {
      throw new AppError("Erro ao buscar notificação!")
    }
  }


  async markAsRead(id: string): Promise<void> {
    try {

      await this.prismaClient.notifications.update({
        where: {
          id,
        },
        data: {
          received: true,
        }
      });
    } catch (error) {
      throw new AppError("Erro ao marcar notificação como lida!")
    }
  }


  async deleteNotification(id: string): Promise<void> {
    try{
      await this.prismaClient.notifications.delete({
        where: {
          id,
        }
      });
    }catch(error){
      throw new AppError("Erro ao deletar notificação!")
    }
  }


}