import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class DeleteAllNotificationsUseCase{
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ){}

  async execute(user_id: string){
    await this.notificationsRepository.deleteAllNotifications(user_id);
  }
}