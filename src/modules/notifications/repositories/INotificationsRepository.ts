import { ICreateNotificationDTO } from "../dtos/ICreateNotificationDTO";
import { Notification } from "../entities/Notification";

export interface INotificationsRepository{
  create({user_id, title, body, channel}: ICreateNotificationDTO): Promise<void>;
  findAll(user_id: string): Promise<Notification[]>;
  findByUserId(user_id: string): Promise<Notification[]>;
  findById(id: string): Promise<Notification>;
  findNotRead(user_id: string): Promise<Notification[]>;
  markAsRead(id: string): Promise<void>;
  deleteNotification(id: string): Promise<void>;
  deleteAllNotifications(user_id: string): Promise<void>;
}