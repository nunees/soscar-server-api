import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class MarkNotificationAsReadUseCase{
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ){}

  async execute(id: string){
    await this.notificationsRepository.markAsRead(id);
  }
}