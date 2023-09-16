import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class FetchDocumentUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("QuotesRepository")
        private quotesRepository: IQuotesRepository

    ){}

    async execute( document_id: string, hashId: string): Promise<string>{

        const document = await this.quotesRepository.fetchDocument(hashId, document_id);

        if(!document){
            throw new Error("Documento não encontrado");
        }

        return document;

    }
}