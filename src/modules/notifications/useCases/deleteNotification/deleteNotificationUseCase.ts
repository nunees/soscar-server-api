import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class DeleteNotificationUseCase{
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ){}

  async execute(id: string){
    await this.notificationsRepository.deleteNotification(id);
  }
}