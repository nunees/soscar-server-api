import { ICreateQuoteDTO } from "@modules/quote/dtos/ICreateQuoteDTO";
import { ICreateQuoteDocumentDTO } from "@modules/quote/dtos/ICreateQuoteDocumentDTO";
import { Quote } from "@modules/quote/entities/Quote";
import { QuotesDocument } from "@modules/quote/entities/QuotesDocuments";
import { UserQuoteDocument } from "@modules/quote/entities/UserQuotesDocuments";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";


@injectable()
export class QuotesRepository implements IQuotesRepository{
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ){}



  async create(quote: ICreateQuoteDTO): Promise<Quote> {
    const quoteCreated = await this.prismaClient.userQuotes.create({
      data: {
        is_juridical: quote.is_juridical,
        user_id: quote.user_id,
        vehicle_id: quote.vehicle_id,
        insurance_type_id: quote.insurance_type_id || null,
        insurance_company_id: quote.insurance_company_id || null,
        service_type_id: Number(quote.service_type_id),
        franchise_price: quote.franchise_price || null,
        service_price: quote.service_price || null,
        user_notes: quote.user_notes || null,
        partner_notes: quote.partner_notes || null,
        created_at: new Date(),
      },
      include: {
        service_type: {
          include: {
            category: true,
          }
        },
        insurance_type: true,
        insurance_company: true,
      }

    });

    return quoteCreated;
  }

  async findQuoteById(quote_id: string): Promise<Quote | null> {
    const quote = await this.prismaClient.userQuotes.findUnique({
      where: {
        id: quote_id
      }
    })
    return quote;
  }

  async createUserQuoteDocument(quote_id: string, document: ICreateQuoteDocumentDTO): Promise<UserQuoteDocument> {

    const documents = await this.prismaClient.userQuotesDocuments.create({
      data: {
        user_quote_id: quote_id,
        document_type_id: document.document_type_id || 0,
        document_url: String(document.document_url),
        created_at: new Date(),
      }
    });

    await this.prismaClient.quotesDocuments.create({
      data: {
        document_id: documents.id,
        quote_id: quote_id,
      }
    })

    return documents;
  }

  async findAllUserQuotes(user_id: string): Promise<Quote[]> {
    const quotes = await this.prismaClient.userQuotes.findMany({
      where: {
        user_id: user_id
      },
      include: {
        vehicles: true,
        service_type: true,
        insurance_type: true,
        insurance_company: true,
      }
    });

    return quotes;
  }

  async findAllUserQuotesDocuments(user_id: string): Promise<QuotesDocument[]> {
    const quotesDocuments = await this.prismaClient.quotesDocuments.findMany({
      where: {
        quote: {
          user_id
        },
      },
      include: {
        document: true,
      }
    });

    return quotesDocuments;
  }

  async findUserQuoteById(user_id: string, quote_id: string): Promise<Quote | null> {
    const quote = await this.prismaClient.userQuotes.findFirst({
      where: {
        user_id,
        AND: {
          QuotesDocuments: {
            some: {
              quote_id: quote_id
            }
          }
        }
      },
      include: {
        vehicles: true,
        service_type: true,
        insurance_type: true,
        insurance_company: true,
      },
    });

    return quote;
  }

  async findUserQuoteDocumentById(quote_id: string, document_id: string): Promise<QuotesDocument | null> {
    const quoteDocument = await this.prismaClient.quotesDocuments.findFirst({
      where: {
        document_id,
      },
      include: {
        document: true,
      }
    })

    return quoteDocument;
  }
}