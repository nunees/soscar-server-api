import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Notification } from "@modules/notifications/entities/Notification";


@injectable()
export class FindNotReadNotificationUseCase{
  constructor(
    @inject("NotificationsRepository")
    private notificationsRepository: INotificationsRepository
  ){}

  async execute(user_id: string): Promise<Notification[]>{
    const notifications = await this.notificationsRepository.findNotRead(user_id);
    if(!notifications){
      throw new AppError("Notificações não encontradas!");
    }
    return notifications;
  }
}