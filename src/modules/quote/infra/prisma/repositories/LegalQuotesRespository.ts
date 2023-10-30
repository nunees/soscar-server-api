import { ILocationDTO } from "@modules/locations/dtos/ILocationDTO";
import { LegalQuote } from "@modules/quote/entities/LegalQuote";
import { LegalQuoteDocument } from "@modules/quote/entities/LegalQuoteDocument";
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
  location_id: string;
};

@injectable()
export class LegalQuotesRepository implements ILegalQuoteRepository{

  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ){}

  async updateDocumentOwner(document_id: string): Promise<void> {
    try{
      console.log("In repository: update document owner", document_id)
      await this.prismaClient.legalQuoteDocuments.update({
        where: {
          id: document_id,
        },
        data: {
          isPartnerDocument: true,
        }
      })
    }catch(error){
      throw new AppError("Erro ao atualizar documento");
    }

  }

  async fetchDocument(hashId: string, document_id: string): Promise<string> {
    try{
      const document = await this.prismaClient.legalQuoteDocuments.findFirst({
        where: {
          hash_id: hashId,
          AND: {
            id: document_id
          }
        }
      });

      return document?.document_url as string;

    }catch(error){
      throw new AppError("Erro ao buscar documento");
    }
  }

 async findQuoteDocuments(hashId: string): Promise<LegalQuoteDocument[]> {
    try{
      const documents = await this.prismaClient.legalQuoteDocuments.findMany({
        where: {
          hash_id: hashId
        }
      });

      return documents;

    }catch(error){
      throw new AppError("Erro ao buscar documentos da cotação");
    }
  }

  async findByHashId(user_id: string, hashId: string): Promise<LegalQuote[]> {
    try{
      console.log("In repository: find by hash id", hashId)
      const quotes = await this.prismaClient.userLegalQuotes.findMany({
        where: {
          hashId: hashId,
          AND: {
            user_id: user_id
          },
        },
        include: {
          users: true,
          location: true,
          vehicles: true,
          LegalQuoteDocuments: true,
          insurance_company: true,
        }
      })

      return quotes as unknown as LegalQuote[];

    }catch(error){
      throw new AppError("Erro ao buscar orcamentos");
    }
  }

  async updateLegalQuote(quote_id: string, franchise_price: number, service_price: number, service_description: string, partner_notes: string, status: number): Promise<void> {
    try{
      await this.prismaClient.userLegalQuotes.update({
        where: {
          id: quote_id
        },
        data: {
          franchise_price: franchise_price,
          service_price: service_price,
          service_decription: service_description,
          partner_notes: partner_notes,
          status: status,
          updated_at: new Date()
        }
      });
    }catch(error){
      throw new AppError("Erro ao atualizar cotação");
    }
  }

  async updateStatus(quote_id: string, status: number): Promise<void> {
    try{

      await this.prismaClient.userLegalQuotes.update({
        where: {
          id: quote_id
        },
        data: {
          status,
          updated_at: new Date()
        }
      });
    }catch(error){
      throw new AppError("Erro ao atualizar status da cotação");
    }
  }



  async findAllByLocation(location_id: string): Promise<LegalQuote[]> {
    try{
      const quotes = await this.prismaClient.userLegalQuotes.findMany({
        where: {
          location_id: location_id
        },
        include: {
          users: true,
          location: true,
          vehicles: true,
          LegalQuoteDocuments: true,
          insurance_company: true,
        }
      });

      return quotes as unknown as LegalQuote[];

    }catch(error){
      throw new AppError("Erro ao buscar orcamentos");
    }
  }

  async findAllLegalQuotes(): Promise<LegalQuote[]> {
    try{
      const quotes = await this.prismaClient.userLegalQuotes.findMany();

      console.log(quotes);

      return quotes as unknown as LegalQuote[];

    }catch(error){
      throw new AppError("Erro ao buscar orcamentos");
    }
  }

  async findAllUserLegalQuotes(user_id: string): Promise<LegalQuote[]> {
    try{
      const quotes = await this.prismaClient.userLegalQuotes.findMany({
        where: {
          user_id: user_id
        },
      });

      return quotes as unknown as LegalQuote[];

    }catch(error){
      throw new AppError("Erro ao buscar orcamentos");
    }
  }

  async findById(id: string): Promise<LegalQuote> {
    try{
      const quote = await this.prismaClient.userLegalQuotes.findFirst({
        where: {
          id: id
        },
        include: {
          users: true,
          location: true,
          vehicles: true,
          LegalQuoteDocuments: true,
          insurance_company: true,
        }
      });

      return quote as unknown as LegalQuote;

    }catch(error){
      throw new AppError("Erro ao buscar orcamento");
    }
  }



  async createQuoteDocument(hashId: string, document_url: string, isPartner: boolean): Promise<LegalQuoteDocument> {
    try{

      const data = await this.prismaClient.legalQuoteDocuments.create({
        data: {
          hash_id: hashId,
          document_url,
          isPartnerDocument: isPartner ?? false
        }
      });



      return data;
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
          service_type_id: quote.service_type_id,
          insurance_company_id: quote.insurance_company_id,
          location_id: quote.location_id,
          user_notes: quote.user_notes,

        }
      });

      return data as unknown as LegalQuote;
    }catch(error){
      throw new AppError("Erro ao salvar cotação no banco de dados");
    }
  }

}