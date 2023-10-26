import { ILegalQuoteRepository } from '@modules/quote/repositories/ILegalQuoteRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

interface IRequest {

  user_id: string;
  quote_id: string;
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
    quote_id,
    document_url,
  }: IRequest): Promise<void> {

    const user = await this.usersRepository.findById(user_id);
    if(!user){
      throw new Error("Usuario não encontrado");
    }

    const quote = await this.legalQuotesRepository.findById(quote_id);

    if (!quote) {
      throw new Error('Orçamento não encontrado');
    }

    await this.legalQuotesRepository.createQuoteDocument(
      quote_id,
      document_url,
      user.isPartner as boolean,
    );
  }
}
