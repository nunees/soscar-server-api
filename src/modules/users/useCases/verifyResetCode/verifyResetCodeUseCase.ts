import { IPasswordResetsRepository } from "@modules/users/repositories/IPasswordResetsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";


@injectable()
export class VerifyResetCodeUseCase{
  constructor(
    @inject("PasswordResetsRepository")
    private passwordResetsRepository: IPasswordResetsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ){}

  async execute(email: string, code: string): Promise<boolean>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new Error("O código de recuperação de senha é inválido.")
    }


    const passwordReset = await this.passwordResetsRepository.findByUserIdAndCode(user.id as string, code);

    if(!passwordReset){
      throw new Error("Não foi possível concluir a operação.")
    }



    if(this.dayjsDateProvider.compareIfBefore(passwordReset.expires_date, this.dayjsDateProvider.datenow())){
      throw new Error("Não foi possível concluir a operação, código inválido.")
    }



    return true;
  }
}