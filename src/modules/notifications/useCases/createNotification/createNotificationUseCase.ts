import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

type IRequest = {
  user_id: string;
  title: string;
  body: string;
  channel: string;
}

@injectable()
export class CreateNotificationUseCase{
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute({user_id, title, body, channel}: IRequest){
    const user = await this.usersRepository.findById(user_id);


    if(!user){
      throw new Error("Receiver not found");
    }

    await this.notificationsRepository.create({
      user_id,
      title,
      body,
      channel
    });


    console.log(user.name);
  }
}