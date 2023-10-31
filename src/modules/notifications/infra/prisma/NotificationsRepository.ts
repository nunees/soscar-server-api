import { ICreateNotificationDTO } from "@modules/notifications/dtos/ICreateNotificationDTO";
import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Notification } from "@modules/notifications/entities/Notification";

@injectable()
export class NotificationsRepository implements INotificationsRepository{
  constructor(
    @inject('PrismaClient')
    private prismaClient: PrismaClient
  ){}

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
      throw new AppError("Notification not found!");
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
      throw new AppError("Notification not found!");
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
      throw new AppError("Notification not created!");
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
      throw new AppError("Notification not found!");
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
      throw new AppError("Notification not found!")
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
      throw new AppError("Notification not found!")
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
      throw new AppError("Notification not found!")
    }
  }


}