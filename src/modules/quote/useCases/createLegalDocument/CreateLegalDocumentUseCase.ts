import { ILegalQuoteRepository } from '@modules/quote/repositories/ILegalQuoteRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

interface IRequest {

  user_id: string;
  hashId: string;
  document_url: string;
}

@injectable()
export class CreateLegalDocumentUseCase {
  constructor(
    @inject('LegalQuotesRepository')
    private legalQuotesRepository: ILegalQuoteRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    user_id,
    hashId,
    document_url,
  }: IRequest) {

    const user = await this.usersRepository.findById(user_id);
    if(!user){
      throw new Error("Usuario não encontrado");
    }



    const data = await this.legalQuotesRepository.createQuoteDocument(
      hashId,
      document_url,
      user.isPartner as boolean,
    );

    return data;
  }
}
