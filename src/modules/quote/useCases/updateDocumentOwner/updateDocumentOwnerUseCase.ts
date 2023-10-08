import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateDocumentOwnerUseCase{
  constructor(
    @inject("QuotesRepository")
    private quotesRepository: IQuotesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ){}

  async execute(document_id: string, user_id: string): Promise<void>{
    const user = await this.usersRepository.findById(user_id);

    if(user?.isPartner === false){
      throw new Error("Usuário não é parceiro");
    }

    await this.quotesRepository.updateDocumentOwner(document_id);
  }
}