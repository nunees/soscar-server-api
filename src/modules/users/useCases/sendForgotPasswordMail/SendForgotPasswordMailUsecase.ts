import { resolve } from "path";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { inject, injectable } from "tsyringe";
import {v4 as uuidV4} from "uuid";
import { GenerateCode } from "@utils/RecoverCodeGenerator";
import { IPasswordResetsRepository } from "@modules/users/repositories/IPasswordResetsRepository";


@injectable()
export class SendForgotPasswordMailUseCase{
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("PasswordResetsRepository")
    private passwordResetsRepository: IPasswordResetsRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ){}

  async execute(email: string): Promise<void>{
    const user = await this.usersRepository.findByEmail(email)

    if(!user){
      throw new Error("Não foi possível concluir a operação.")
    }

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );



    const expires_date = this.dayjsDateProvider.addHours(3);

    const code = GenerateCode(16);

    await this.passwordResetsRepository.create({
      user_id: user.id as string,
      expires_date,
      code,
    })

    const variables = {
      name: user.name,
      code,
    };


    await this.mailProvider.send({
      to: `${user.name} <${user.email}>`,
      subject: "Recuperação de senha",
      path: templatePath,
      variables
    })


  }
}