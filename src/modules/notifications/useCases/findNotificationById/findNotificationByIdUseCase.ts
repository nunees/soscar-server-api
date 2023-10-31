import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindNotificationByIdUseCase{
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ){}

  async execute(id: string){
    const notifications = await this.notificationsRepository.findById(id);

    return notifications;
  }
}