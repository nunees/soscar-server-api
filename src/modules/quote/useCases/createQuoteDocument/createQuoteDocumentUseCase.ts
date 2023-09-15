import { ICreateQuoteDocumentDTO } from "@modules/quote/dtos/ICreateQuoteDocumentDTO";
import { QuotesDocument } from "@modules/quote/entities/QuotesDocuments";
import { UserQuoteDocument } from "@modules/quote/entities/UserQuotesDocuments";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { AppError } from "@shared/errors/AppError";
import { FileExtensionToNumber, GetFiletypes, GetUploadFileNames } from "@utils/getUploadFileNames";
import { Multer } from "multer";
import { doc } from "prettier";
import { inject, injectable } from "tsyringe";

interface IRequest{
  user_id: string;
  quote_id: string;
  document: string;
  hashId: string;
}

@injectable()
export class CreateQuoteDocumentUseCase{
  constructor(
    @inject("QuotesRepository")
    private quotesRepository: IQuotesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository,
  ){}

  async execute({document, quote_id, user_id, hashId}: IRequest): Promise<UserQuoteDocument>{

    const userExists = await this.usersRepository.findById(user_id);

    if(!userExists){
      throw new Error("Usuario não existe");
    }

    if(userExists.isPartner){
      throw new Error("Usuarios parceiro não podem criar orçamentos");
    }

    const quoteExists = await this.quotesRepository.findQuoteById(quote_id);

    if(!quoteExists){
      throw new Error("Orçamento informado não existe");
    }

    const fileExtension = document.split(".")[1];


    if(!fileExtension){
      throw new Error("Extensão do arquivo não encontrada");
    }

    const result = await this.quotesRepository.createUserQuoteDocument(quote_id, {
      user_quote_id: quote_id,
      document_type_id: FileExtensionToNumber(fileExtension),
      document_url: document,
      hashId
    });

    return result;
  }
}