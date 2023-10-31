import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllNotificationsUseCase{
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ){}

  async execute(user_id: string){
    const notifications = await this.notificationsRepository.findAll(user_id);

    return notifications;
  }
}