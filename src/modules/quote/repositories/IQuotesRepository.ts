import { ICreateQuoteDTO } from "../dtos/ICreateQuoteDTO";
import { ICreateQuoteDocumentDTO } from "../dtos/ICreateQuoteDocumentDTO";
import { IReturnQuote } from "../dtos/IReturnQuote";
import { Quote } from "../entities/Quote";
import { QuotesDocument } from "../entities/QuotesDocuments";
import { UserQuoteDocument } from "../entities/UserQuotesDocuments";

export interface IQuotesRepository{
  create(quote: ICreateQuoteDTO): Promise<Quote>;
  createUserQuoteDocument(quote_id: string, document: ICreateQuoteDocumentDTO): Promise<UserQuoteDocument>;
  findQuoteById(quote_id: string): Promise<IReturnQuote | null>;
  findAllUserQuotes(user_id: string): Promise<IReturnQuote[]>;
  findAllUserQuotesDocuments(user_id: string): Promise<QuotesDocument[]>;
  findUserQuoteById(user_id: string, quote_id: string): Promise<Quote | null>;
  findUserQuoteDocumentById(quote_id: string, document_id: string): Promise<QuotesDocument | null>;
}