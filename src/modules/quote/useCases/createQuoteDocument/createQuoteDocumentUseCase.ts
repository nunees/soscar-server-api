import { ICreateQuoteDocumentDTO } from "@modules/quote/dtos/ICreateQuoteDocumentDTO";
import { QuotesDocument } from "@modules/quote/entities/QuotesDocuments";
import { UserQuoteDocument } from "@modules/quote/entities/UserQuotesDocuments";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { AppError } from "@shared/errors/AppError";
import { GetFiletypes, GetUploadFileNames } from "@utils/getUploadFileNames";
import { Multer } from "multer";
import { inject, injectable } from "tsyringe";

interface IRequest{
  user_id: string;
  quote_id: string;
  documents: any;
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

  async execute({documents, quote_id, user_id}: IRequest): Promise<UserQuoteDocument>{

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

    const fileNames = documents.map((file: Express.Multer.File) => file.filename);

    const fileExtension = GetFiletypes(documents[0].mimetype.split("/")[0]);

    console.log("extension: " + fileExtension);


    const createdQuoteDocument = await this.quotesRepository.createUserQuoteDocument(quoteExists.id, {
      user_quote_id: quoteExists.id,
      document_type_id: fileExtension,
      document_url: fileNames,
    });

    return createdQuoteDocument;
  }
}