import { ILocationDTO } from "@modules/locations/dtos/ILocationDTO";
import { LegalQuote } from "@modules/quote/entities/LegalQuote";
import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

type IRequest = {
  user_id: string;
  hashId: string;
  vehicle_id: string;
  insurance_company_id: number;
  service_type_id: number;
  user_notes: string;
  locations: string[];
};

@injectable()
export class LegalQuotesRepository implements ILegalQuoteRepository{

  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ){}

  async findById(id: string): Promise<LegalQuote> {
    try{
      const quote = await this.prismaClient.userLegalQuotes.findFirst({
        where: {
          id: id
        },
      });

      return quote as unknown as LegalQuote;

    }catch(error){
      throw new AppError("Erro ao buscar orcamento");
    }
  }



  async createQuoteDocument(quote_id: string, document_url: string, isPartner: boolean): Promise<void> {
    try{
      console.log("In repository: create document",)
      const data = await this.prismaClient.legalQuoteDocuments.create({
        data: {
          quote_id,
          document_url,
          isPartnerDocument: isPartner ?? false
        }
      });

      console.log(data);
    }catch(error){
      throw new AppError("Erro ao salvar documento da cotação no banco de dados");
    }
  }

  async create(quote: IRequest): Promise<LegalQuote> {
    try{
      const data = await this.prismaClient.userLegalQuotes.create({
        data: {
          hashId: quote.hashId,
          user_id: quote.user_id,
          vehicle_id: quote.vehicle_id,
          insurance_company_id: quote.insurance_company_id,
          locations: quote.locations,
          user_notes: quote.user_notes,

        }
      });

      return data as unknown as LegalQuote;
    }catch(error){
      throw new AppError("Erro ao salvar cotação no banco de dados");
    }
  }

}