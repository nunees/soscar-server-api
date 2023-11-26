import { ICreateQuoteDTO } from "@modules/quote/dtos/ICreateQuoteDTO";
import { ICreateQuoteDocumentDTO } from "@modules/quote/dtos/ICreateQuoteDocumentDTO";
import { IReturnQuote } from "@modules/quote/dtos/IReturnQuote";
import { IUpdateRegularQuoteDTO } from "@modules/quote/dtos/IUpdateRegularQuoteDTO";
import { Quote } from "@modules/quote/entities/Quote";
import { QuotesDocument } from "@modules/quote/entities/QuotesDocuments";
import { UserQuoteDocument } from "@modules/quote/entities/UserQuotesDocuments";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
export class QuotesRepository implements IQuotesRepository{
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ){}

  async updateDocumentOwner(document_id: string): Promise<void> {
    try{
      await this.prismaClient.userQuotesDocuments.update(
        {
          where: {
            id: document_id,
          },
          data: {
            isPartnerDocument: true,
          }
        }
      );


    }catch(error){
      throw new AppError("Erro ao atualizar documento");
    }
  }

  async createPartnerQuoteDocument(quote_id: string, document: ICreateQuoteDocumentDTO): Promise<QuotesDocument> {
    try{
      const documents = await this.prismaClient.partnerQuotesDocuments.create({
        data: {
          hashId: document.hashId,
          quote_id,
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
    }catch(error){
      throw new AppError("Erro ao salvar arquivos no banco de dados");
    }
  }

  async updateQuoteStatus(user_id: string, quote_id: string, status: number): Promise<Quote> {
    try{

      const quote = await this.prismaClient.userQuotes.findFirst({
        where: {
          id: quote_id
        }
      });



      if(!quote){
        throw new AppError("Orçamento nao encontrado");
      }

      const newQuote = await this.prismaClient.userQuotes.update({
        where: {
          id: quote_id,
        },
        data: {
          ...quote,
          status: status,
          updated_at: new Date(),
        }
      });

      return newQuote;
    }catch(error){

      throw new AppError("Erro ao atualizar status do orçamento");
    }
  }

  async updateRegularQuote(user_id: string, quote_id: string, data: IUpdateRegularQuoteDTO): Promise<Quote> {

    try{
      const quote = await this.prismaClient.userQuotes.update({
        where: {
          id: quote_id,
        },
        data: {
          franchise_price: data.franchise_price,
          service_decription: data.service_description,
          service_price: Number(data.service_price),
          partner_notes: data.partner_notes,
          status: data.status,
          updated_at: new Date(),
        }
      });





      return quote;
    }catch(error){

      throw new AppError("Erro ao atualizar orçamento");
    }
  }


  async fetchDocument(hashId: string, document_id: string): Promise<string> {
    try {
      const document = await this.prismaClient.userQuotesDocuments.findFirst({
        where: {
          hashId,
          AND: {
            id: document_id,
          }
        }
      });

      return document?.document_url as string;
    } catch (error) {
      throw new AppError("Erro ao buscar arquivo");
    }
  }



  async create(quote: ICreateQuoteDTO): Promise<Quote> {
    const quoteCreated = await this.prismaClient.userQuotes.create({
      data: {
        is_juridical: quote.is_juridical || false,
        hashId: quote.hashId,
        user_id: quote.user_id,
        vehicle_id: quote.vehicle_id,
        insurance_type_id: quote.insurance_type_id || null,
        insurance_company_id: quote.insurance_company_id || null,
        service_type_id: Number(quote.service_type_id),
        user_notes: quote.user_notes || null,
        partner_notes: quote.partner_notes || null,
        location_id: quote.location_id ,
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

  async findQuoteById(quote_id: string): Promise<IReturnQuote | null> {

    const quote = await this.prismaClient.userQuotes.findUnique({
      where: {
        id: quote_id
      },
      include:{
        users: true,
        insurance_company: true,
        vehicles: true,
        UserQuotesDocuments: true,
      }
    })
    return quote as unknown as IReturnQuote;
  }

  async createUserQuoteDocument(quote_id: string, document: ICreateQuoteDocumentDTO): Promise<UserQuoteDocument> {
    try{
      const documents = await this.prismaClient.userQuotesDocuments.create({
        data: {
          hashId: document.hashId,
          user_quote_id: quote_id,
          document_type_id: document.document_type_id || 0,
          document_url: String(document.document_url),
        }
      });

      await this.prismaClient.quotesDocuments.create({
        data: {
          document_id: documents.id,
          quote_id: quote_id,
        }
      })

      return documents;
    }catch(error){
      throw new AppError("Erro ao salvar arquivos no banco de dados");
    }
  }

  async findAllUserQuotes(user_id: string, user_type: string): Promise<IReturnQuote[]> {


    if(user_type === "client"){
      const quotes = await this.prismaClient.userQuotes.findMany({
        where: {
          user_id: user_id
        },
        include: {
          UserQuotesDocuments: {
            select: {
              document_type: {
                select: {
                  id: true,
                  name: true,
                }
              },
              document_url: true,
            }
          },
          location: true,
          vehicles: true,
          insurance_company: {
            select: {
              name: true,
              id: true,
            }
          },
          users: {
            select: {
              name: true,
              email: true,
              mobile_phone: true,
              avatar: true,
            }
          }
        }
      });




      return quotes  as unknown as IReturnQuote[];
    }

    if(user_type === "partner"){
      const quotes = await this.prismaClient.userQuotes.findMany({
        where: {
          location: {
            users: {
              id: user_id,
            }
          },
        },
        include: {
          UserQuotesDocuments: {
            select: {
              document_type: {
                select: {
                  id: true,
                  name: true,
                }
              },
              document_url: true,
            }
          },
          vehicles: true,
          insurance_company: {
            select: {
              name: true,
              id: true,
            }
          },
          users: {
            select: {
              name: true,
              email: true,
              mobile_phone: true,
              avatar: true
            }
          }
        }
      });


      return quotes as unknown as IReturnQuote[];
    }

    return [];
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
        UserQuotesDocuments: true,
      },
    });

    return quote;
  }

  async findUserQuoteDocumentById(quote_id: string, document_id: string): Promise<QuotesDocument | null> {
    try{
      const quoteDocument = await this.prismaClient.quotesDocuments.findFirst({
        where: {
          quote_id,
          AND: {
            document_id,
          }
        },
        include: {
          document: true,
        }
      });

      return quoteDocument;
    }catch(error){
      throw new AppError("Erro ao buscar arquivo");
    }
  }
}